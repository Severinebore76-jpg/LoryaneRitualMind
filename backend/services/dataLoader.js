// 🧩 dataLoader.js
// ------------------------------------------------------------
// Service central de lecture et chargement des fichiers JSON
// de rituels mensuels pour Orelys Ritual Mind.
// ------------------------------------------------------------

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Gestion correcte des chemins avec ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📂 Dossier contenant les fichiers JSON mensuels
const DATA_DIR = path.join(__dirname, "../data/rituals_json");

/**
 * 🔍 Liste tous les fichiers JSON disponibles dans /data/rituals_json.
 * @returns {string[]} — liste des fichiers trouvés
 */
export function listAvailableMonths() {
  try {
    const files = fs.readdirSync(DATA_DIR);
    return files.filter((file) => file.endsWith(".json"));
  } catch (err) {
    console.error("❌ Erreur lors du chargement des fichiers :", err);
    return [];
  }
}

/**
 * 📘 Charge le contenu d’un mois spécifique (ex: "01_Janvier_Renaissance").
 * @param {string} monthFileName — nom du fichier (sans extension .json)
 * @returns {object|null} — contenu JSON du fichier ou null en cas d’erreur
 */
export function loadMonthData(monthFileName) {
  try {
    const filePath = path.join(DATA_DIR, `${monthFileName}.json`);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Fichier introuvable : ${filePath}`);
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
 * 🔢 Retourne un rituel précis selon le mois et le jour.
 * @param {string} monthFileName — nom du fichier (ex: "02_Fevrier_DouceurAmour")
 * @param {number} day — numéro du jour (1–31)
 * @returns {object|null} — rituel du jour ou null si absent
 */
export function getRitualByDay(monthFileName, day) {
  const monthData = loadMonthData(monthFileName);
  if (!monthData || !Array.isArray(monthData)) return null;

  return monthData.find((entry) => Number(entry.day) === Number(day)) || null;
}

/**
 * 🧭 Retourne tous les rituels des 12 mois sous forme combinée.
 * @returns {object[]} — liste complète des rituels (janvier → décembre)
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

/**
 * 📦 Charge un fichier JSON générique (ex: messages.json)
 * @param {string} fileName — nom du fichier JSON dans /data/
 * @returns {object|null} — contenu JSON ou null en cas d’erreur
 */
export function loadJSON(fileName) {
  try {
    // Cherche d’abord dans /data/, sinon dans /data/rituals_json/
    let filePath = path.join(__dirname, "../data", fileName);

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

console.log("✅ dataLoader prêt — lecture des rituels depuis :", DATA_DIR);
