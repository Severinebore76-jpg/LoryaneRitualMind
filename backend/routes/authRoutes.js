// backend/routes/authRoutes.js
import express from "express";
import { authUser } from "../controllers/authController.js";

const router = express.Router();

// Login / register + retour token
router.post("/", authUser);

export default router;
