// @ts-nocheck

import fs from "fs";
import path from "path";

// ---------------------------
// Charge un fichier JSON de mois
// ---------------------------
const loadMonthJSON = async (fileName) => {
  const filePath = path.join(
    process.cwd(),
    "backend",
    "data",
    "months_json",
    fileName
  );
  const raw = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(raw);
};

// ---------------------------
// Récupère la liste des mois
// ---------------------------
export const getAllMonths = async (req, res, next) => {
  try {
    const monthsPath = path.join(
      process.cwd(),
      "backend",
      "data",
      "months_json"
    );
    const files = await fs.promises.readdir(monthsPath);

    const months = files
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(".json", ""));

    res.status(200).json(months);
  } catch (error) {
    next(error);
  }
};

// ---------------------------
// Récupère le contenu d’un mois
// ---------------------------
export const getMonthContent = async (req, res, next) => {
  try {
    const monthKey = req.params.month;
    const filename = `${monthKey}.json`;
    const data = await loadMonthJSON(filename);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
