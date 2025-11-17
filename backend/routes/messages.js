// 🧩 backend/routes/messages.js
// ----------------------------------------------------
// Routes pour la gestion des messages inspirants (Freemium)
// ----------------------------------------------------

import express from "express";
import { getTodayMessage } from "../controllers/messagesController.js";

const router = express.Router();

// 🌞 Message du jour Freemium
router.get("/today", getTodayMessage);

export default router;
