import express from "express";

import { IEvent } from "../models/event.model";
import { IUser } from "../models/user.model";
import {
    create as createEvent,
    IEventListOptions,
    list as listEvents,
} from "../services/event.service";
import { create as createUser } from "../services/user.service";

const router = express.Router();

router.post("/", (req, res) => {
    try {
        const user: IUser = {
            email: req.body.email,
            password: req.body.password,
        };
        res.status(201).json({
            userId: createUser(user),
        });
    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
});

router.post("/:id/events", (req, res) => {
    try {
        const event: IEvent = {
            type: req.body.type,
            userId: req.params.id,
        };
        res.status(201).json({
            eventId: createEvent(event),
        });
    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
});

router.get("/:id/events", (req, res) => {
    const options: IEventListOptions = { userId: req.params.id };
    res.status(200).json({
        events: listEvents(options),
    });
});

export default router;
