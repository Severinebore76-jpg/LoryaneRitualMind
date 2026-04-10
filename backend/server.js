// 🧩 backend/server.js

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

// ❌ ON N'IMPORTE PAS Mongo pour l’instant
// import connectDB from "./config/db.js";

// Middlewares
import { errorHandler } from "./middlewares/errorHandler.js";

// Routes
import messagesRoutes from "./routes/messages.js";
import ritualsRoutes from "./routes/rituals.js";

// (optionnel) tu peux laisser mais inutile pour ton bug actuel
// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Routes API
app.use("/api/rituals", ritualsRoutes);
app.use("/api/messages", messagesRoutes);

// (optionnel)
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);

// Route test
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend opérationnel" });
});

// Middleware erreurs
app.use(errorHandler);

// 🚀 Lancement serveur PROPRE
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Serveur backend lancé sur le port ${PORT}`);
});

// Gestion erreurs serveur
server.on("error", (err) => {
  console.error("❌ Erreur serveur:", err);
});