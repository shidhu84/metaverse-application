import { Router } from "express";
import client from "@repo/db/client";
import {
  AddElementSchema,
  CreateSpaceSchema,
  DeleteElementSchema,
} from "../../types";
import { validateUserToken } from "../../middleware/user";
export const spaceRouter = Router();

spaceRouter.post("/", validateUserToken, async (req, res) => {
  const parsedData = CreateSpaceSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: "Invalid Request data" });
    return;
  }
  if (!parsedData.data?.mapId && !parsedData.data?.dimensions) {
    res.status(400).json({ message: "Invalid Request data" });
    return;
  }
  try {
    if (!parsedData.data?.mapId) {
      const saveSapceResponse = await client.space.create({
        data: {
          name: parsedData.data.name,
          width: parseInt(parsedData.data.dimensions.split("x")[0]),
          height: parseInt(parsedData.data.dimensions.split("x")[1]),
          creatorId: req.userId,
        },
      });
      res.json({ spaceId: saveSapceResponse.id });
      return;
    }
    const mapData = await client.map.findFirst({
      where: {
        id: parsedData.data.mapId,
      },
      select: {
        mapElements: true,
        width: true,
        height: true,
      },
    });
    if (!mapData) {
      res.status(400).json({ message: "Map not found" });
      return;
    }
    let space = await client.$transaction(async () => {
      const space = await client.space.create({
        data: {
          name: parsedData.data.name,
          width: mapData.width,
          height: mapData.height,
          creatorId: req.userId!,
        },
      });

      await client.spaceElements.createMany({
        data: mapData.mapElements.map((e) => ({
          spaceId: space.id,
          elementId: e.elementId,
          x: e.x!,
          y: e.y!,
        })),
      });

      return space;
    });
    res.json({ spaceId: space.id });
    return;
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "Internal server error" });
    return;
  }
});

spaceRouter.delete("/element", validateUserToken, async (req, res) => {
  try {
    const parsedData = DeleteElementSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({ message: "Invalid request" });
      return;
    }
    const spaceElement = await client.spaceElements.findFirst({
      where: {
        id: parsedData.data.id,
      },
      include: {
        space: true,
      },
    });
    if (
      !spaceElement?.space.creatorId ||
      spaceElement.space.creatorId !== req.userId
    ) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }
    const deleteResponse = await client.spaceElements.delete({
      where: {
        id: parsedData.data.id,
      },
    });
    res.json({ message: "Element deleted" });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Unauthorized" });
  }
});

spaceRouter.delete("/:spaceId", validateUserToken, async (req, res) => {
  const checkIsSpaceExist = await client.space.findUnique({
    where: {
      id: req.params.spaceId,
    },
    select: {
      creatorId: true,
    },
  });
  if (!checkIsSpaceExist) {
    res.status(400).json({ message: "Space not found" });
    return;
  }
  if (checkIsSpaceExist.creatorId !== req.userId) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }
  try {
    const deleteResponse = await client.space.delete({
      where: {
        id: req.params.spaceId,
      },
    });
    res.status(200).json({ message: "Space deleted successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Space not found" });
  }
});

spaceRouter.get("/all", validateUserToken, async (req, res) => {
  try {
    const getAllSpace = await client.space.findMany({
      where: {
        creatorId: req.userId,
      },
    });
    res.json({
      spaces: getAllSpace.map((s) => ({
        id: s.id,
        name: s.name,
        thumbnail: s.thumbnail,
        dimensions: `${s.width}x${s.height}`,
      })),
    });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error" });
  }
});

spaceRouter.post("/element", validateUserToken, async (req, res) => {
  const parsedData = AddElementSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: "Validation failed" });
    return;
  }
  try {
    const space = await client.space.findUnique({
      where: {
        id: parsedData.data.spaceId,
        creatorId: req.userId,
      },
      select: {
        width: true,
        height: true,
      },
    });
    if (!space) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }
    if (
      parsedData.data.x < 0 ||
      parsedData.data.y < 0 ||
      parsedData.data.x > space.width ||
      parsedData.data.y > space.height
    ) {
      res.status(400).json({ message: "Point is outside of the boundary" });
      return;
    }
    await client.spaceElements.create({
      data: {
        elementId: parsedData.data.elementId,
        spaceId: parsedData.data.spaceId,
        x: parsedData.data.x,
        y: parsedData.data.y,
      },
    });
    res.status(200).json({ message: "Space element added successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Internal server Error" });
  }
});

spaceRouter.get("/:spaceId", async (req, res) => {
  const spaceId = req.params.spaceId;
  if (!spaceId) {
    res.status(400).json({ message: "Invalid request" });
    return;
  }
  try {
    const spaceResponse = await client.space.findUnique({
      where: {
        id: spaceId,
      },
      include: {
        elements: {
          include: {
            element: true,
          },
        },
      },
    });
    if (!spaceResponse) {
      res.status(400).json({ message: "Space Not found" });
      return;
    }
    res.json({
      dimentions: `${spaceResponse.width}x${spaceResponse.height}`,
      elements: spaceResponse.elements.map((e) => ({
        id: e.id,
        element: {
          id: e.element.id,
          imageUrl: e.element.imageUrl,
          width: e.element.width,
          height: e.element.height,
          static: e.element.static,
        },
        x: e.x,
        y: e.y,
      })),
    });
  } catch (error) {
    res.status(400).json({ message: "Internal server error" });
    return;
  }
});
