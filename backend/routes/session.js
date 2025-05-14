const express = require("express");
const router = express.Router();

// Add a player
router.post("/add-player", (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    req.session.players.push(name);
    res.json({ message: "Player added!", players: req.session.players });
});

// Get players list
router.get("/players", (req, res) => {
    res.json({ players: req.session.players });
});

export default router;
    