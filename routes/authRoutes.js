const express = require("express");
const passport = require("../config/passport");
const { githubCallback } = require("../controllers/authController");

const router = express.Router();

router.get("/auth/github", passport.authenticate("github", { scope: ["read:user"] }));

router.get("/auth/callback", passport.authenticate("github", { failureRedirect: "/" }), githubCallback);

module.exports = router;
