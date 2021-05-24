import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { initRoutes } from "./routes";
import { accessLog, errorRequestHandler } from "./middleware";
import { config } from "./entity";

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection(config)
  .then(async (_) => {
    var distDir = __dirname + "/dist/";
    // create express app
    const app = express();
    app.use(express.static(distDir));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(accessLog);

    // register all application routes
    initRoutes(app);

    app.use(errorRequestHandler);
    // run app
    app.listen(process.env.PORT || "5000");

    console.log(
      "Express application is up and running on port " +
        (process.env.PORT || "5000")
    );
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
