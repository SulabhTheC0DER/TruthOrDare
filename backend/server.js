import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import { authenticateToken } from "./middleware/authMiddleware.js";
import { Server } from "socket.io";
import http from "http";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => console.error("❌ MongoDB Connection Error:", error));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/games", authenticateToken, gameRoutes);
app.use("/api/questions", authenticateToken, questionRoutes);

app.get("/", (req, res) => {
  res.send("🎮 Truth or Dare API is running...");
});

// WebSocket Handling
let players = [];

io.on("connection", (socket) => {
  console.log(`🔗 User Connected: ${socket.id}`);

  // New Player Joins
  socket.on("playerJoined", (playerName) => {
    if (!players.includes(playerName)) {
      players.push(playerName);
      console.log(`👤 ${playerName} joined the game`);
    }
    io.emit("updatePlayers", players);
  });

  // Truth or Dare Selection
  socket.on("newTruthOrDare", (data) => {
    console.log(`🎭 ${data.player} chose ${data.type}`);
    io.emit("updateGame", data);
  });

  // Player Disconnects
  socket.on("disconnect", () => {
    console.log(`❌ User Disconnected: ${socket.id}`);
    players = players.filter((p) => p !== socket.id);
    io.emit("updatePlayers", players);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
