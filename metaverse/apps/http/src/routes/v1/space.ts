import { Router } from "express";
import client from "@repo/db/client";
import { CreateSpaceSchema } from "../../types";
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

spaceRouter.delete("/element", async (req, res) => {});

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

spaceRouter.post("/element", async (req, res) => {});

spaceRouter.get("/:spaceId", async (req, res) => {});
