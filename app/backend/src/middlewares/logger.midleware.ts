import { NextFunction } from "express";
import LOGGER from "../helpers/logger";

export const Logger = async () => {
  return async (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const start = new Date().getMilliseconds();
    next();

    const ms = new Date().getMilliseconds() - start;

    const msg = `${req.method} ${req.url} ${res.status} ${ms}ms`;

    LOGGER.info(msg);
  };
};
