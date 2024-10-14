import { Router } from "express";

export default abstract class CommonRoutes {
  public abstract router: Router;
  public abstract path: string;
}
