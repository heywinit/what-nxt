import dotenv from "dotenv";

dotenv.config();

export default {
  JWT_SECRET: process.env.JWT_SECRET,

  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,

  PORT: process.env.PORT || 3000,
};
