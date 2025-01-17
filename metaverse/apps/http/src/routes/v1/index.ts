import { Router } from "express";
import { userRouter } from "./user";
import { spaceRouter } from "./space";
import { adminRouter } from "./admin";
import client from "@repo/db/client";
import { SignInSchema, SignUpSchema } from "../../types";
import { compare, hash } from "../../scrypt";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../../config";

export const router = Router();

router.post("/signup", async (req, res) => {
  debugger;
  const parseData = SignUpSchema.safeParse(req.body);
  if (!parseData.success) {
    res.status(400).json({ message: "Validation Failed" });
    return;
  }
  const hashPassword = await hash(parseData.data.password);
  try {
    const user = await client.user.create({
      data: {
        username: parseData.data.username,
        password: hashPassword,
        role: parseData.data.type === "admin" ? "Admin" : "User",
      },
    });
    res.json({
      userId: user.id,
    });
  } catch (error) {
    console.log("error@@", error);
    res.status(400).json({ message: "User already exists" });
  }
});

router.post("/signin", async (req, res) => {
  const parseData = SignInSchema.safeParse(req.body);
  if (!parseData.success) {
    console.log("error@@");
    res.status(400).json({ message: "Validation Failed" });
  }
  try {
    const user = await client.user.findUnique({
      where: {
        username: req.body.username,
      },
    });
    console.log("user@@", user);
    if (!user) {
      console.log("error user@@");
      res.status(403).json({ message: "User not found" });
    }
    const isPasswordValid = compare(parseData.data?.password!, user?.password!);
    if (!isPasswordValid) {
      console.log("error password@@");
      res.status(400).json({ message: "User name or password does not match" });
    }
    const token = jwt.sign(
      {
        id: user?.id,
        role: user?.role,
      },
      JWT_PASSWORD
    );
    res.json({ token: `Bearer ${token}` });
  } catch (error) {
    res.status(400).json({ message: "Somthing went  wrong" });
  }
});

router.get("/elements", async (req, res) => {});

router.get("/avatars", async (req, res) => {});

router.use("/user", userRouter);
router.use("/space", spaceRouter);
router.use("/admin", adminRouter);
