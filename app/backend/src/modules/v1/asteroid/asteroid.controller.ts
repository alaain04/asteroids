import { NextFunction, Request, Response } from "express";
import { BadRequestResponse, SuccessResponse } from "../../../helpers/error";
import {
  IAsteroid,
  IAsteroidQueryParams,
} from "src/interfaces/asteroid.interface";
import FavoriteAsteroidService from "../../../services/favorite-asteroid.service";
import AsteroidService from "../../../services/asteroid.service";
import config from "../../../helpers/config";

export class AsteroidController {
  private readonly asteroidService: AsteroidService = new AsteroidService();
  private readonly favoriteAsteroidService: FavoriteAsteroidService =
    new FavoriteAsteroidService();

  public retrieveAsteroids = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query: IAsteroidQueryParams = {
        API_KEY: config.NASA_KEY!,
        start_date: req.query.date_from as string,
        end_date: req.query.date_to as string,
      };
      const response = await this.asteroidService.search(query);
      const asteroids: IAsteroid[] = [];
      Object.keys(response.near_earth_objects).forEach((key) => {
        response.near_earth_objects[key].forEach((asteroid: IAsteroid) => {
          asteroid.viewing_date = key;
          asteroids.push({ ...asteroid });
        });
      });

      // Add favs related data
      let asteroidsWithFavs = await this.addFavsRelatadData([...asteroids]);

      // Filter just favs if its required
      if (req.query.just_favs === "true")
        asteroidsWithFavs = asteroidsWithFavs.filter((af) => af.fav_id);

      const sorted = asteroidsWithFavs.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );

      SuccessResponse(res, sorted);
    } catch (err) {
      next(err);
    }
  };

  private async addFavsRelatadData(asteroids: IAsteroid[]) {
    const ids: string[] = asteroids.map((ast) => ast.id);
    const asteroidFavs =
      await this.favoriteAsteroidService.retrieveFavoritesInList(ids);
    asteroidFavs.forEach((fav) => {
      const asteroid = asteroids.find((a) => a.id === fav.asteroid_id);
      if (asteroid) asteroid.fav_id = fav.id;
    });
    return asteroids;
  }

  public addFavoriteAsteroid = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const asteroidId: string = req.params.id;
      const favoriteSaved =
        await this.favoriteAsteroidService.retrieveFirstAsteroidFavorites(
          asteroidId
        );

      if (favoriteSaved) {
        throw BadRequestResponse(
          res,
          `The asteroid id ${asteroidId} already has a favorite flag created.`
        );
      }

      const favorite = await this.favoriteAsteroidService.createFavorite(
        asteroidId
      );

      SuccessResponse(res, favorite);
    } catch (err) {
      next(err);
    }
  };

  public removeFavoriteAsteroid = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const favId: number = Number(req.params.favId);

      const favorite = await this.favoriteAsteroidService.retrieveFavorite(
        favId
      );
      if (!favorite) {
        BadRequestResponse(
          res,
          `The favorite asteroid id ${favId} doesn't exist.`
        );
        return;
      }
      const removed = await this.favoriteAsteroidService.removeFavorite(favId);
      SuccessResponse(res, removed);
    } catch (err) {
      next(err);
    }
  };
}
