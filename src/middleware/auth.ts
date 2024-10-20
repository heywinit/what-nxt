import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import constants from "../utils/constants";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }

  try {
    (req as any).user = jwt.verify(token, constants.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
};

export const adminAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }

  try {
    const user = jwt.verify(token, constants.JWT_SECRET);
    if ((user as any).role !== "admin") {
      return res.status(403).json({ message: "Forbidden", success: false });
    }

    (req as any).user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
};
