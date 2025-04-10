const jwt = require("../config/jwt");

function githubCallback(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "No Authorized" });
  }

  req.login(req.user, (err) => {
    if (err) {
      return res.status(500).json({ message: "Error al iniciar sesión" });
    }

    res.json({ message: "Autenticado correctamente" });
  });
}

module.exports = { githubCallback };
