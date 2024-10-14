import { Response } from "express";
import { Request } from "express";

export default interface IController {
  (req: Request, res: Response): void;
}
