import { Router } from "express";
import { AsteroidController } from "./asteroid.controller";
import {
  addFavoriteAsteroidSchema,
  asteroidQuerySchema,
  removeFavoriteAsteroid,
} from "./asteroid.schema";
import {
  paramsValidator,
  queryValidator,
} from "../../../middlewares/validate.middleware";
import CommonRoutes from "../../common/common.routes";

export default class AsteroidRoutes extends CommonRoutes {
  public router = Router();
  public path = "asteroids";
  private readonly asteroidController: AsteroidController =
    new AsteroidController();

  constructor() {
    super();
    this.router.get(
      "/",
      [queryValidator(asteroidQuerySchema)],
      this.asteroidController.retrieveAsteroids
    );

    this.router.post(
      "/:id/favorites",
      [paramsValidator(addFavoriteAsteroidSchema)],
      this.asteroidController.addFavoriteAsteroid
    );
    this.router.delete(
      "/:id/favorites/:favId",
      [paramsValidator(removeFavoriteAsteroid)],
      this.asteroidController.removeFavoriteAsteroid
    );
  }
}
