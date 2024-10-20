import { NextFunction, Request, Response } from "express";

export const loggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (["/api-docs", "/favicon.ico"].includes(req.url)) {
    return next();
  }

  console.info(`${req.method} ${req.url}`);
  next();
};
