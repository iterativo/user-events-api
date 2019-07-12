import config from "config";
import express from "express";

const app = express();
const {
    protocol,
    host,
    port,
} = config.get("server");

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.listen(port, () => {
    console.log(`Server listening at ${ protocol }://${ host }:${ port }`); // tslint:disable-line no-console
});
