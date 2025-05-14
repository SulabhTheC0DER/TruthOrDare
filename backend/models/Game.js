import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    currentTurn: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    history: [
      {
        player: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        choice: { type: String, enum: ["truth", "dare"] },
        question: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);
export default Game;
