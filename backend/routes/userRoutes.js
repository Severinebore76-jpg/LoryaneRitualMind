// backend/routes/userRoutes.js
import express from "express";
import {
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

// Création compte freemium
router.post("/", registerUser);

// Récupérer un profil par id
router.get("/:id", getUserProfile);

// Mettre à jour le profil
router.put("/:id", updateUserProfile);

export default router;
