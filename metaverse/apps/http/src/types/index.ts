import { z } from "zod";

export const SignUpSchema = z.object({
  username: z.string().min(4),
  password: z.string(),
  type: z.enum(["admin", "user"]),
});

export const SignInSchema = z.object({
  username: z.string().min(4),
  password: z.string(),
});

export const UpdateMetaDataSchema = z.object({
  avatarId: z.string(),
});

export const CreateSpaceSchema = z.object({
  name: z.string(),
  dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
  mapId: z.string(),
});

export const DeleteElementSchema = z.object({
  id: z.string(),
});

export const AddElementSchema = z.object({
  elementId: z.string(),
  spaceId: z.string(),
  x: z.number(),
  y: z.number(),
});

export const CreateElementSchema = z.object({
  imageUrl: z.string(),
  width: z.number(),
  height: z.number(),
  static: z.boolean(),
});

export const updateElementSchema = z.object({
  imageUrl: z.string(),
});

export const createAvatarSchema = z.object({
  imageUrl: z.string(),
  name: z.string(),
});

export const createMapSchema = z.object({
  thumbnail: z.string(),
  dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
  name: z.string(),
  defaultElements: z.array(
    z.object({
      elementId: z.string(),
      x: z.number(),
      y: z.number(),
    })
  ),
});

declare global {
  namespace Express {
    interface Request {
      userId: string;
      role: string;
    }
  }
}
