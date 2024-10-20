import { NextFunction, Request, Response } from "express";

//todo figure out later on
//initial idea was to loop through req body and validate each, like validate email w regex, validate phone number, etc
export const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "POST" && Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Body is empty", success: false });
  } else {
    next();
  }
};
