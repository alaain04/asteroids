import { Response } from "express";

const setResponse = <T>(res: Response, data: T, status: number) => {
  let body: any = data;
  // If response is not an object, transform into it
  if (typeof data !== "object") body = { message: data };
  return res.status(status).json(body).end();
};

export const SuccessResponse = <T>(res: Response, data: T) => {
  const status = 200;
  return setResponse<T>(res, data, status);
};

export const BadRequestResponse = <T>(res: Response, data: T) => {
  const status = 400;
  return setResponse<T>(res, data, status);
};

export const NotFoundResponse = <T>(res: Response, data: T) => {
  const status = 404;
  return setResponse<T>(res, data, status);
};

export const UnprocessableResponse = <T>(res: Response, data: T) => {
  const status = 422;
  return setResponse<T>(res, data, status);
};
