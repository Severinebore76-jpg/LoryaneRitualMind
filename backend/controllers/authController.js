// backend/controllers/authController.js
import User from "../models/User.js";
import generateToken from "../utils/generationToken.js";

export const authUser = async (req, res) => {
  try {
    const { email, name, avatar } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email obligatoire." });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name: name || null,
        avatar: avatar || null,
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Authentification OK",
      token,
      user,
    });
  } catch (error) {
    console.error("Erreur authUser:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
