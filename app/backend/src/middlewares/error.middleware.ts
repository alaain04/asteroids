import { Response, Request, NextFunction } from "express";
import LOGGER from "../helpers/logger";

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!error || error instanceof Response) {
    next();
  } else {
    const status = 500;
    const message = "Something went wrong. Internal error.";
    LOGGER.error(error);
    res.status(status).send({ status, message }).end();
  }
};
