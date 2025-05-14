import Game from "../models/Game.js";
import User from "../models/User.js";

export const startGame = async (req, res) => {
  try {
    const { players } = req.body;
    const newGame = new Game({ players, currentTurn: players[0], history: [] });
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).json({ error: "Game creation failed" });
  }
};

export const getGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId).populate("players");
    if (!game) return res.status(404).json({ error: "Game not found" });
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: "Error fetching game" });
  }
};

export const playTurn = async (req, res) => {
  try {
    const { choice, question } = req.body;
    const game = await Game.findById(req.params.gameId);
    if (!game) return res.status(404).json({ error: "Game not found" });

    game.history.push({ player: game.currentTurn, choice, question });
    game.currentTurn = game.players[(game.players.indexOf(game.currentTurn) + 1) % game.players.length];

    await game.save();
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: "Error updating turn" });
  }
};
