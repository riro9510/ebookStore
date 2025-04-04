const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "clave_super_secreta";

/*const isAuthenticated  = (req,res,next) =>{
    if(req.session.user === undefined){
        return res.status(401).json("You do not have access");
    }
    next();
}

module.exports = {
    isAuthenticated
}
*/
function authenticateToken(req, res, next) {
  const token = req.cookies.jwt || req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
