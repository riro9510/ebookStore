const router = require('express').Router();
const passport = require('passport');
const { githubCallback } = require("../controller/authController");
router.use('/', require('./swagger'));

router.use('/books', require('./books'));
router.use('/users', require('./users'));
router.get("/login", passport.authenticate("github", { scope: ["read:user"] }));

router.get("/auth/callback", passport.authenticate("github", { failureRedirect: "/" }), githubCallback);

router.get("/logout",function(req,res,next){
    req.logOut(function(err){
        if(err){ return next(err);}
        res.redirect("/");
    })
})
router.get('/', (req, res) => {
  const loggedStatus = req.session.user !== undefined
    ? `Logged in as ${req.session.user.displayName}`
    : 'Logged out';

  res.send(`
    <p>${loggedStatus}</p>
    <a href="/api-docs/">Click here to go to the API documentation</a>
  `);
});


module.exports = router;
