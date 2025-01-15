import { Router } from "express";
import { userRouter } from "./user";
import { spaceRouter } from "./space";
import { adminRouter } from "./admin";
import client from "@repo/db/client";

export const router = Router();

router.post("/signup", async (req, res) => {
})

router.post("/signin", async (req, res) => {
})

router.get("/elements", async (req, res) => {
})

router.get("/avatars", async (req, res) => {
})

router.use("/user", userRouter)
router.use("/space", spaceRouter)
router.use("/admin", adminRouter)
