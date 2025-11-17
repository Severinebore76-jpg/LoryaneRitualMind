// 🧩 messagesController.js
// ------------------------------------------------------------
// Contrôleur des messages inspirants pour Orelys Ritual Mind
// ------------------------------------------------------------

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getMessageByDay } from "../services/dataLoader.js";

// Reconstruction __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 🌞 GET /api/messages/today
 * Retourne le message du jour Freemium
 */
export const getTodayMessage = (req, res) => {
  try {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;

    // 📂 Chemin vers les messages mensuels
    const messagesDir = path.join(__dirname, "../data/messages_json");

    // Liste réelle de tous les fichiers disponibles
    const files = fs.readdirSync(messagesDir);

    // On cherche un fichier commençant par "08_" par exemple
    const prefix = String(month).padStart(2, "0") + "_";
    const file = files.find((f) => f.startsWith(prefix));

    if (!file) {
      return res.status(404).json({
        success: false,
        message: `Aucun fichier de messages pour le mois ${month}`,
      });
    }

    // On retire l’extension ".json"
    const monthKey = file.replace(".json", "");

    // 🔎 Récupération du message du jour via dataLoader
    const todayMessage = getMessageByDay(monthKey, day);

    // Si pas de message pour ce jour → fallback doux
    if (!todayMessage) {
      return res.status(200).json({
        success: true,
        message: "Le calme est la clé de l’alignement.",
        fallback: true,
      });
    }

    // ✔️ Réponse complète
    return res.status(200).json({
      success: true,
      day,
      month: monthKey,
      message: todayMessage.message,
      stone: todayMessage.stone ?? null,
      essential_oil: todayMessage.essential_oil ?? null,
      symbol: todayMessage.symbol ?? null,
    });
  } catch (error) {
    console.error("❌ Erreur getTodayMessage :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur interne",
    });
  }
};
