
function githubCallback(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "No autorizado" });
  }

  req.login(req.user, (err) => {
    if (err) {
      return res.status(500).json({ message: "Error al iniciar sesión" });
    }

    req.session.user = req.user;
    res.redirect('/'); 
  });
}

module.exports = { githubCallback };
