var wasimExpress = require("express");
var middleware = require("../middleware/index");
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var router = wasimExpress.Router({
  "mergeParams": true
});



// NEW comments route
router.get("/new", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            req.flash("error", "Something went wrong");
           console.log(err);
        } else {
            res.render("comments/new", {
              "campground": foundCampground
            });
        }
        
    });  // end Campground.findById


}); // end NEW comments route



// Comments Create route
router.post("/", middleware.isLoggedIn, function (req, res) {

    // find campgrounds
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            req.flash("error", "Something went wrong");
           console.log(err);
        } else {

            // create comments
            Comment.create(req.body.comment, function (err, createdComment) {
              if (err) {
                req.flash("error", "Something went wrong");
                console.log(err);
              } else {

                //add logged in user details to comment

                createdComment.author.id = req.user._id;
                createdComment.author.username = req.user.username;
                createdComment.save(function (err) {
                  if (err) {
                    req.flash("error", "Something went wrong");
                     console.log(err);
                  }
                });
                // add comments
                foundCampground.comments.push(createdComment);
                foundCampground.save(function (err) {
                  if (err) {
                    req.flash("error", "Something went wrong");
                     console.log(err);
                  }
                });
                req.flash("success", "Your comment is successfully added!");
                res.redirect("/campgrounds/" + foundCampground._id);
                
            }
          });  // end Comment.create
        }

      
    }); // end find campgrounds


});// end Comments Create route






// comment edit route to show form
router.get("/:commentId/edit", middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.commentId, function (err, foundComment) {
    res.render("comments/edit", {
        "comment": foundComment,
        "campgroundId": req.params.id
    });

}); // end Comment.findById

}); // end comment edit route 






// Update comment PUT request
router.put("/:commentId", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function (err) {
        if (err) {
            req.flash("error", "Something went wrong");
           console.log(err);
        } else {
            req.flash("success", "Comment is successfully updated");
           res.redirect("/campgrounds/" + req.params.id);
        }
    }); // end Comment.findByIdAndUpdate


}); // End Update comment PUT request




// Delete comment DELETE request
router.delete("/:commentId", middleware.checkCommentOwnership, function (req, res) {

    Comment.findByIdAndRemove(req.params.commentId, function (err) {
        if (err) {
            req.flash("error", "Something went wrong");
           console.log(err);
        } else {
            req.flash("success", "Comment is successfully deleted");
           res.redirect("/campgrounds/" + req.params.id);
        }
    }); // end Comment.findByIdAndRemove


}); // end Delete comment DELETE request



module.exports = router;