import { Joi } from "celebrate";

export const asteroidQuerySchema = Joi.object({
  date_from: Joi.date().optional(),
  date_to: Joi.date().optional(),
  order_by: Joi.string().optional(),
  just_favs: Joi.boolean().required(),
});

export const addFavoriteAsteroidSchema = Joi.object({
  id: Joi.string().required(),
});

export const removeFavoriteAsteroid = Joi.object({
  id: Joi.string().required(),
  favId: Joi.string().required(),
});
