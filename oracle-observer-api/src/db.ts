import knex from "knex";
import * as config from "./knexfile";

const getDB = () => {
  const env = process.env.NODE_ENV || "development";
  // @ts-ignore
  return knex(config.default[env]);
};

export const db = getDB();
