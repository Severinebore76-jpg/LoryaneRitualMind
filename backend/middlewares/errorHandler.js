// backend/middlewares/errorHandler.js
// ----------------------------------------------------
// Middleware global pour gérer les erreurs serveur/API
// ----------------------------------------------------
export const errorHandler = (err, req, res, next) => {
  console.error("❌ Erreur API :", err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Erreur interne du serveur",
  });
};
export default errorHandler;
