import axios from "axios";

export const retrieveAsteroids = async (
  dateFrom: string,
  dateTo: string,
  justFavs: boolean
) => {
  const response = await axios.get(`${import.meta.env.VITE_SERVER}/asteroids`, {
    params: {
      date_from: dateFrom,
      date_to: dateTo,
      just_favs: justFavs,
    },
  });
  return response.data;
};

export const addToAsteroidFavs = async (asteroidId: string) => {
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER}/asteroids/${asteroidId}/favorites`
  );
  return response.data;
};

export const removeFromAsteroidFavs = async (
  asteroidId: string,
  favId: number
) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_SERVER}/asteroids/${asteroidId}/favorites/${favId}`
  );
  return response.data;
};
