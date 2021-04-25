import "reflect-metadata";
import { createConnection } from "typeorm";
import * as bodyParser from "body-parser";
import express from 'express';
import { initRoutes } from "./routes";
import { accessLog, errorRequestHandler } from "./middleware";
import { config } from "./entity";

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection(config).then(async _ => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(accessLog)

    // register all application routes
    initRoutes(app)

    app.use(errorRequestHandler);
    // run app
    app.listen(3000);

    console.log("Express application is up and running on port 3000");

}).catch(error => console.log("TypeORM connection error: ", error));