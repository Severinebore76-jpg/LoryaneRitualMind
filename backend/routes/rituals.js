// backend/routes/rituals.js
import express from "express";
import {
  getAllRituals,
  getAvailableMonths,
  getRitualByMonthAndDay,
  getRitualsByMonth,
  getTodayRitual,
} from "../controllers/ritualsController.js"; // <- vérifie bien l’orthographe du chemin réel

const router = express.Router();

// Spécifiques d'abord, dynamiques ensuite
router.get("/", getAllRituals); // /api/rituals
router.get("/months", getAvailableMonths); // /api/rituals/months
router.get("/today", getTodayRitual); // /api/rituals/today  ✅ avant toute dynamique
router.get("/:month/:day", getRitualByMonthAndDay); // /api/rituals/:month/:day
router.get("/:month", getRitualsByMonth); // /api/rituals/:month

export default router;
