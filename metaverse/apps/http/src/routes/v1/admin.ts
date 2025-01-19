import { Router } from "express";
import client from "@repo/db/client";
import { createAvatarSchema } from "../../types";
import { adminMiddleware } from "../../middleware/admin";
export const adminRouter = Router();

adminRouter.post("/element", async (req, res) => {});

adminRouter.put("/element/:elementId", (req, res) => {});

adminRouter.post("/avatar", adminMiddleware, async (req, res) => {
  const parseData = createAvatarSchema.safeParse(req.body);
  if (!parseData?.success) {
    res.status(403).json({ message: "Validation Error" });
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

adminRouter.post("/map", async (req, res) => {});
