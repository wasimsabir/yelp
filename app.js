var wasimExpress =        require("express"),
  bodyParser =            require("body-parser"),
  app =                   wasimExpress(),
  flash =                 require("connect-flash"),
  methodOverride =        require("method-override"),
  User =                  require("./models/user"),
  mongoose =              require("mongoose"),
  passport =              require("passport"),
  localStrategy =         require("passport-local"),
  passportLocalMongoose = require ("passport-local-mongoose"),
  Comment =               require("./models/comment"),
  Campground =            require("./models/campground"),
  campgroundRoute =       require("./routes/campgrounds"),
  commentRoute =          require("./routes/comments"),
  indexRoute =            require("./routes/index"),
  seedDb =                require("./seed");
  
mongoose.connect(process.env.DATABASEURL);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Database is successfully connected! ");
  
  // seedDb(); // seeding database



  app.use(wasimExpress.static(__dirname + "/includes"));
  app.set("view engine", "ejs");
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(flash());
  app.use(methodOverride("_method"));
  app.use(require("express-session")({
    "secret": "Saif babu",
    "resave": false,
    "saveUninitialized": false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new localStrategy( User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  //middleware
  app.use(function(req, res, next){
    res.locals.user = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
  });

  app.use("/campgrounds", campgroundRoute);
  app.use("/campgrounds/:id/comments", commentRoute);
  app.use(indexRoute);


  app.get("*", function (req, res) {
    res.send("Sorry, the page you are requesting doesn't exist! ");
  });

  var me = require("./me");

  me.foo();
  me.loo();
  me.soo();

 const PORT = process.env.PORT || 3000;
  app.listen(PORT, function () {
    console.log("The Yelp Camp Server Has started!");
  });

});