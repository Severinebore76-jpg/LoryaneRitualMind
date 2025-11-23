// backend/controllers/userController.js
import User from "../models/User.js";

// CREATE ACCOUNT (freemium)
export const registerUser = async (req, res) => {
  try {
    const { email, name, avatar } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email obligatoire." });
    }

    // Vérifier si déjà existant
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        message: "Utilisateur déjà enregistré.",
        user: existingUser,
      });
    }

    const newUser = await User.create({
      email,
      name: name || null,
      avatar: avatar || null,
    });

    res.status(201).json({
      message: "Compte créé.",
      user: newUser,
    });
  } catch (error) {
    console.error("Erreur registerUser:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// GET USER PROFILE
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    res.json(user);
  } catch (error) {
    console.error("Erreur getUserProfile:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// UPDATE PROFILE
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, avatar },
      { new: true }
    );

    res.json({
      message: "Profil mis à jour.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erreur updateUserProfile:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
