import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_PASSWORD) as {
      userId: string;
      role: string;
    };
    if (!decoded || decoded.role !== "Admin") {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {}
};
