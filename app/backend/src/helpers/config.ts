import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT ?? 3000,
  NASA_API: process.env.NASA_API,
  NASA_KEY: process.env.NASA_KEY,
};
