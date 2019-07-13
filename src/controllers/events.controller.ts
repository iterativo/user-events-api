import express from "express";

import { list } from "../services/event.service";

const router = express.Router();

router.get("/", (req, res) => {
    try {
        res.status(200).json({
            events: list(),
        });
    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
});

export default router;
