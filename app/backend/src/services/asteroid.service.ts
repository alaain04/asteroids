import {
  IAsteroidsResponse,
  IAsteroidQueryParams,
} from "src/interfaces/asteroid.interface";
import axios, { AxiosResponse } from "axios";
import config from "../helpers/config";

export default class AsteroidService {
  private readonly nasaApi = config.NASA_API;

  async search(params: IAsteroidQueryParams) {
    const res: AxiosResponse<IAsteroidsResponse> =
      await axios.get<IAsteroidsResponse>(`${this.nasaApi}/feed`, { params });

    return res.data;
  }
}
