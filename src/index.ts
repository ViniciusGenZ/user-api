/* eslint-disable no-console */
import { appDataSource } from "./data-source";
import "reflect-metadata";
import app from "../src/server/app";

appDataSource
  .initialize()
  .then(async () => {
    try {
      app.listen(process.env.SERVER_PORT);
      console.log(`Server listening on port ${process.env.SERVER_PORT}`);
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error: unknown) => {
    console.log({
      host: process.env.DATABASE_URL,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
    })
    console.log(error)
  });
