var wasimExpress = require("express");
var middleware = require("../middleware/index");
var Campground = require("../models/campground");
var router = wasimExpress.Router();



// Restful INDEX Route
router.get("/", function (req, res) {
    
    //Get all campgrounds from db
    Campground.find({}, function (err, allCampGrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/campgrounds", {
              "camp": allCampGrounds, "message": req.flash("success")
          });
        }
    }); // find campground end

}); // Index route end




// Restful NEW Route
router.get("/new", middleware.isLoggedIn, function (req, res) {

   res.render("campgrounds/addCampGrounds");

}); // New route end





// Restful Create Route
router.post("/", middleware.isLoggedIn, function (req, res) {

      var user = req.user;
      
      var formDataReceived = {
        "name": req.body.name,
        "image": req.body.image,
        "description": req.body.description,
        "price": Number(req.body.price)
      };

      Campground.create(formDataReceived, function (err, campground) {
          if (err) {
             console.log(err);
          } else {
              campground.author.id = req.user._id;
              campground.author.username = req.user.username;
              campground.save(function (err) {
                if (err) {
                   console.log(err);
                }
              });

          } // else end
      });
      res.redirect("/campgrounds");


}); // end create route




// Restful SHOW Route
router.get("/:id", function (req, res) {

    Campground.findById(req.params.id).populate("comments").exec(function (err, campground) {
        if (err) {
           console.log(err);
        } else {
            res.render("campgrounds/show", {
              campground: campground
            });
        }
    }); // camground find by id ends


}); // show route end




// Campground Edit GET, showing edit form
router.get("/:id/edit", middleware.isCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", 
        { "campgrounds": foundCampground });


    }); // end Campground.findById


});  // end campground edit route




// Campground Update, PUT
router.put("/:id", middleware.isCampgroundOwnership, function (req, res) {

    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampdround) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("success", "Campground successfully updated");
           res.redirect("/campgrounds/" + req.params.id);
        }
    });

}); // end campground end





// Campground Destroy, DELETE
router.delete("/:id", middleware.isCampgroundOwnership, function (req, res) {

    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("success", "Campground successfully deleted");
           res.redirect("/campgrounds");
        }
    });

}); // Campground destroy end



module.exports = router;