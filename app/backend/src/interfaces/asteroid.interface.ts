// Interfaces
import { IBaseQueryParams } from "./common.interface";

export interface ICreateFavorite {
  asteroid_id: string;
}

export interface IAsteroidQueryParams extends IBaseQueryParams {
  start_date?: string;
  end_date?: string;
  order_by?: string;
}

export interface IAsteroidsResponse {
  links: {
    next: string;
    previous: string;
    self: string;
  };
  element_count: number;
  near_earth_objects: {
    [date: string]: IAsteroid[];
  };
}

export interface IAsteroid {
  links: {
    self: string;
  };
  fav_id?: number;
  viewing_date?: string;
  id: string;
  neo_reference_id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
    miles: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
    feet: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: ICloseApproachData[];
  is_sentry_object: boolean;
}

interface ICloseApproachData {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  relative_velocity: {
    kilometers_per_second: string;
    kilometers_per_hour: string;
    miles_per_hour: string;
  };
  miss_distance: {
    astronomical: string;
    lunar: string;
    kilometers: string;
    miles: string;
  };
  orbiting_body: string;
}
