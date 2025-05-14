import express from "express";
import { startGame, getGame, playTurn } from "../controllers/gameController.js";

const router = express.Router();

router.post("/start", startGame);
router.get("/:gameId", getGame);
router.post("/:gameId/play", playTurn);

export default router;
