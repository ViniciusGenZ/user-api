/* eslint-disable no-console */
import { appDataSource } from "./data-source";
import "reflect-metadata";
import dotenv from "dotenv";
import app from "../src/server/app";

dotenv.config();

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
  .catch((error) => console.log(error));
