const jwt = require("../config/jwt");

function githubCallback(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "No Authorized" });
  }

  const token = jwt.generateToken(req.user);

  res.cookie("jwt", token, { httpOnly: true, secure: false });

  res.json({ message: "Autenticated", token });
}

module.exports = { githubCallback };
