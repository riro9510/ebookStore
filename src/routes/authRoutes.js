const express = require("express");
const passport = require("../config/passport");
const { githubCallback } = require("../controller/authController");

const router = express.Router();

router.get("login", passport.authenticate("github", { scope: ["read:user"] }));

router.get("/auth/callback", passport.authenticate("github", { failureRedirect: "/" }), githubCallback);

router.get("/logout",function(req,res,next){
    req.logOut(function(err){
        if(err){ return next(err);}
        res.redirect("/");
    })
})
module.exports = router;
