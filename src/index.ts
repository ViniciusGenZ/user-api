/* eslint-disable no-console */
import { appDataSource } from "./data-source";
import "reflect-metadata";
import app from "../src/server/app";

appDataSource
  .initialize()
  .then(async () => {
    try {
      app.listen(process.env.PORT);
      console.log(`Server listening on port ${process.env.PORT}`);
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.log({
      host: process.env.DATABASE_URL,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
    })
    console.log(error)
  });
