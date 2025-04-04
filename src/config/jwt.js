const jwt = require("jasonwebtoken");
const SECRETKEY = process.env.JWT_SECRET;

function generateToken(user){
    return jwt.sign(
        {id:user.id, username:user.Username},
        SECRETKEY,
        {
            expiresIn:'1hr'
        }
    )
};
function verifyToken(token){
    return jwt.verify(token,SECRETKEY)
}

module.exports = { generateToken, verifyToken };