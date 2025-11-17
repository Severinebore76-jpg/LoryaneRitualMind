// 🧩 dataLoader.js
// ------------------------------------------------------------
// Service central de lecture et chargement des fichiers JSON
// des rituels et des messages mensuels pour Orelys Ritual Mind.
// ------------------------------------------------------------

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Gestion correcte des chemins ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------------------------------------------------
// 🕯️ RITUELS — Dossier d'origine (NE PAS TOUCHER)
// ------------------------------------------------------------
const RITUALS_DIR = path.join(__dirname, "../data/rituals_json");

/**
 * Liste tous les fichiers JSON disponibles dans /data/rituals_json.
 */
export function listAvailableMonths() {
  try {
    const files = fs.readdirSync(RITUALS_DIR);
    return files.filter((file) => file.endsWith(".json"));
  } catch (err) {
    console.error(
      "❌ Erreur lors du chargement des fichiers de rituels :",
      err
    );
    return [];
  }
}

/**
 * Charge le contenu d’un mois spécifique (rituels).
 */
export function loadMonthData(monthFileName) {
  try {
    const filePath = path.join(RITUALS_DIR, `${monthFileName}.json`);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Fichier de rituel introuvable : ${filePath}`);
      return null;
    }

    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch (err) {
    console.error(`❌ Erreur de parsing JSON pour ${monthFileName}:`, err);
    return null;
  }
}

/**
 * Retourne un rituel précis selon le mois et le jour.
 */
export function getRitualByDay(monthFileName, day) {
  const monthData = loadMonthData(monthFileName);
  if (!monthData || !Array.isArray(monthData)) return null;

  return monthData.find((entry) => Number(entry.day) === Number(day)) || null;
}

/**
 * Retourne tous les rituels sur l’ensemble des 12 mois.
 */
export function loadAllRituals() {
  const allFiles = listAvailableMonths();
  const allData = [];

  for (const file of allFiles) {
    const monthName = file.replace(".json", "");
    const data = loadMonthData(monthName);
    if (data) {
      allData.push({
        month: monthName,
        rituals: data,
      });
    }
  }

  return allData;
}

// ------------------------------------------------------------
// 🌿 MESSAGES — NOUVEAU système mensuel (AJOUT PROPRE)
// ------------------------------------------------------------

// 📂 Dossier messages mensuels
const MESSAGES_DIR = path.join(__dirname, "../data/messages_json");

/**
 * Liste les fichiers JSON disponibles pour les messages.
 */
export function listAvailableMessageMonths() {
  try {
    const files = fs.readdirSync(MESSAGES_DIR);
    return files.filter((file) => file.endsWith(".json"));
  } catch (err) {
    console.error(
      "❌ Erreur lors du chargement des fichiers de messages :",
      err
    );
    return [];
  }
}

/**
 * Charge les messages d’un mois spécifique.
 */
export function loadMonthMessages(monthFileName) {
  try {
    const filePath = path.join(MESSAGES_DIR, `${monthFileName}.json`);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Fichier message introuvable : ${filePath}`);
      return null;
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error(`❌ Erreur de parsing message ${monthFileName}:`, err);
    return null;
  }
}

/**
 * Retourne un message précis selon le mois et le jour.
 */
export function getMessageByDay(monthFileName, day) {
  const monthData = loadMonthMessages(monthFileName);
  if (!monthData || !Array.isArray(monthData)) return null;

  return monthData.find((entry) => Number(entry.day) === Number(day)) || null;
}

// ------------------------------------------------------------
// 📦 Charge un JSON générique (fallback)
// ------------------------------------------------------------
export function loadJSON(fileName) {
  try {
    // Cherche d’abord dans /data/
    let filePath = path.join(__dirname, "../data", fileName);

    // Sinon dans /data/rituals_json
    if (!fs.existsSync(filePath)) {
      filePath = path.join(__dirname, "../data/rituals_json", fileName);
    }

    if (!fs.existsSync(filePath)) {
      throw new Error(`Fichier JSON introuvable : ${fileName}`);
    }

    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch (err) {
    console.error(`❌ Erreur lors du chargement de ${fileName}:`, err);
    return null;
  }
}

console.log("✅ dataLoader prêt — lecture rituels :", RITUALS_DIR);
console.log("✅ dataLoader prêt — lecture messages :", MESSAGES_DIR);
