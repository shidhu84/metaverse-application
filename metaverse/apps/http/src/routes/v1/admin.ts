import { Router } from "express";
import client from "@repo/db/client";
import {
  AddElementSchema,
  createAvatarSchema,
  CreateElementSchema,
  createMapSchema,
  updateElementSchema,
} from "../../types";
import { adminMiddleware } from "../../middleware/admin";
import { parse } from "node:path";
export const adminRouter = Router();

adminRouter.post("/element", adminMiddleware, async (req, res) => {
  const parseData = CreateElementSchema.safeParse(req.body);
  if (!parseData?.success) {
    res.status(400).json({ message: "Validation failed" });
    return;
  }
  try {
    const addElementResponse = await client.element.create({
      data: {
        imageUrl: parseData.data?.imageUrl,
        width: parseData.data.width,
        height: parseData.data.height,
        static: parseData.data.static, // weather or not the user can sit on top of this element (is it considered as a collission or not)
      },
    });
    res.json({
      id: addElementResponse.id,
    });
  } catch (error) {
    res.status(400).json({ message: "Internal server error" });
  }
});

adminRouter.put("/element/:elementId", adminMiddleware, async (req, res) => {
  if (!req.params.elementId) {
    res.status(400).json("Invalid input request!");
    return;
  }
  const parsedData = updateElementSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: "Validation failed" });
    return;
  }
  try {
    await client.element.update({
      where: {
        id: req.params.elementId,
      },
      data: {
        imageUrl: parsedData.data.imageUrl,
      },
    });
    res.json({ message: "Element successfully updated!" });
  } catch (error) {
    res.status(400).json("Internal server error!");
  }
});

adminRouter.post("/avatar", adminMiddleware, async (req, res) => {
  const parseData = createAvatarSchema.safeParse(req.body);
  if (!parseData?.success) {
    res.status(400).json({ message: "Validation failed" });
    return;
  }
  try {
    const result = await client.avatar.create({
      data: {
        imageUrl: parseData.data?.imageUrl,
        name: parseData.data?.name,
      },
    });
    res.json({
      avatarId: result.id,
    });
  } catch (error) {
    res.status(400).json({ message: "Internal server error" });
  }
});

adminRouter.post("/map", adminMiddleware, async (req, res) => {
  const parseData = createMapSchema.safeParse(req.body);
  if (!parseData?.success) {
    res.status(400).json({ message: "Validation failed" });
    return;
  }
  try {
    const createMapResponse = await client.map.create({
      data: {
        thumbnail: parseData.data?.thumbnail!,
        width: parseInt(parseData.data.dimensions.split("x")[0]),
        height: parseInt(parseData.data.dimensions.split("x")[1]),
        name: parseData.data?.name,
        mapElements: {
          create: parseData.data.defaultElements.map((e) => ({
            elementId: e.elementId,
            x: e.x,
            y: e.y,
          })),
        },
      },
    });
    res.json({
      id: createMapResponse.id,
    });
  } catch (error) {
    res.status(400).json({ message: "Internal Server error" });
  }
});
