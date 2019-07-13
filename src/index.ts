import bodyParser from "body-parser";
import config from "config";
import express from "express";

import eventsController from "./controllers/events.controller";
import usersController from "./controllers/users.controller";

const server = express();

// Middleware
server.use(bodyParser.json());

// Routes
server.use("/v1/users", usersController);
server.use("/v1/events", eventsController);

const {
    protocol,
    host,
    port,
} = config.get("server");

server.listen(port, () => {
    console.log(`Server listening at ${ protocol }://${ host }:${ port }`); // tslint:disable-line no-console
});
