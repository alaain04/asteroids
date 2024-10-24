import { UnprocessableResponse } from "../helpers/error";
import { NextFunction, Response, Request } from "express";

interface IValidationError {
  message: string;
  errors: string;
}

const validateSchema = (
  schema: any,
  data: any,
  res: Response,
  next: NextFunction
) => {
  const result = schema.validate(data);

  if (result.error) {
    const errors = result.error.details.map((e: any) => ({
      message: e?.message,
    }));
    const body: IValidationError = {
      message: result.error.details[0].message,
      errors,
    };
    UnprocessableResponse<IValidationError>(res, body);
  } else {
    next();
  }
};

export const bodyValidator = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    validateSchema(schema, req.body, res, next);
  };
};

export const queryValidator = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    validateSchema(schema, req.query, res, next);
  };
};

export const paramsValidator = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    validateSchema(schema, req.params, res, next);
  };
};
