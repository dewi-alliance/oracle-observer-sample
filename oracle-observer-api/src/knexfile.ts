import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
  },
  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
  },
};
