import { Router } from "express";
import client from "@repo/db/client";
import { UpdateMetaDataSchema } from "../../types";
import { validateUserToken } from "../../middleware/user";

export const userRouter = Router();

userRouter.post("/metadata", validateUserToken, async (req, res) => {
  const parseData = UpdateMetaDataSchema.safeParse(req.body);
  if (!parseData.success) {
    res.status(400).json({ message: "Validation failed" });
    return;
  }
  try {
    const checkAvatar = await client.avatar.findUnique({
      where: {
        id: parseData.data?.avatarId,
      },
    });
    if (!checkAvatar) {
      res.status(400).json({ message: "Avatar not found" });
      return;
    }
    await client.user.update({
      where: {
        id: req.userId,
      },
      data: {
        avatarId: parseData.data?.avatarId,
      },
    });
    res.status(200).json({ message: "Metadata updated" });
  } catch (error) {
    res.status(400).json({ message: "Internal server error" });
  }
});

userRouter.get("/metadata/bulk", async (req, res) => {
  try {
    const userIdString = (req.query.ids ?? "[]") as string;
    const userIds = userIdString.slice(1, userIdString?.length - 1).split(",");
    const matchedData = await client.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        avatar: true,
      },
    });

    res.status(200).json({
      avatars: matchedData.map((m) => ({
        userId: m.id,
        avatarId: m.avatar?.imageUrl,
      })),
    });
  } catch (error) {
    res.status(400).json("Failed to get metadatas");
  }
});
