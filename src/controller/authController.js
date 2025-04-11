
function githubCallback(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "No autorizado" });
  }
  console.log("Usuario autenticado:", req.user);
  req.login(req.user, (err) => {
    if (err) {
      return res.status(500).json({ message: "Error al iniciar sesión" });
    }

    res.redirect('/'); 
  });
}

module.exports = { githubCallback };
