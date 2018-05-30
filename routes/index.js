var wasimExpress = require("express");
var User = require("../models/user");
var passport = require("passport");
var localStrategy = require("passport-local");
var router = wasimExpress.Router();

router.get("/", function (req, res) {
  res.render("landing");
});

/* Register********************** */
// Sign up GET route, show form
router.get("/signup", function(req, res){
  res.render("register/signup");
});



// Sign up POST route, handle signup
router.post("/signup", function(req, res){
  User.register(new User({"username": req.body.username}), req.body.password, function(err, savedUser){
    if(err){
      req.flash("error", err.message);
      return res.redirect("/signup");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to Yelpcamp " + savedUser.username);
      res.redirect("/campgrounds");
    });
  });

}); // end signup route



// Login GET route,  show form
router.get("/login", function(req, res){
  res.render("register/login");
}); 




// login POST route, handle login
router.post("/login", passport.authenticate("local", {
  "successRedirect": "/campgrounds",
  "failureRedirect": "/login"
}), function(req, res){
});


// Logout GET route
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Successfully logged you out");
  res.redirect("/campgrounds");
});

module.exports = router;