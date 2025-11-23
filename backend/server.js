// 🧩 backend/server.js
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

// Connexion DB
import connectDB from "./config/db.js";

// Middlewares
import { errorHandler } from "./middlewares/errorHandler.js";

// Routes API existantes
import messagesRoutes from "./routes/messages.js";
import ritualsRoutes from "./routes/rituals.js";

// Nouvelles routes (utilisateurs + auth)
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

// Connexion BDD
connectDB();

const app = express();
const PORT = process.env.PORT || 5050;

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Routes existantes
app.use("/api/rituals", ritualsRoutes);
app.use("/api/messages", messagesRoutes);

// Nouvelles routes User + Auth
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Route de test
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend Loryane Ritual Mind opérationnel" });
});

// Middleware global d’erreurs
app.use(errorHandler);

// Lancement serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend lancé sur le port ${PORT}`);
});
export default app;
