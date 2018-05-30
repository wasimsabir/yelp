var Comment = require("../models/comment");
var Campground = require("../models/campground");
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
       return next();
    }
    req.flash("error", "You must be logged in");
    res.redirect("/login");
}

middlewareObj.isCampgroundOwnership = function(req, res, next) {
      if (req.isAuthenticated()) {
          Campground.findById(req.params.id, function (err, foundCampground) {
                if (err) {
                       req.flash("error", "Campground not found");
                       res.redirect("back");
                } else {
                      if (foundCampground.author.id.equals(req.user._id)) {
                         next();
                      } else {
                          req.flash("error", "You are not authorized to do that");
                         res.redirect("back");
                      }

                }
          });

      } 
      
       else {
           req.flash("error", "You must me be logged in");
          res.redirect("back");
      }

}  // end isCampgroundOwnership



middlewareObj.checkCommentOwnership = function(req, res, next) {

      // is user logged in ?
      if (req.isAuthenticated()) {

          Comment.findById(req.params.commentId, function (err, foundComment) {
              if (err) {
                  console.log(err);
              } else {
                // does the logged in user own this comment?
                    if (foundComment.author.id.equals(req.user._id)) {
                      next();
                    } else {
                        req.flash("error", "You are not authorized to do that");
                      res.redirect("back");
                    }

              }

          });  //Comment.findById
      } 
      
      else {
          req.flash("error", "You must be logged in");
         res.redirect("back");
      }


} // end checkCommentOwnership


module.exports = middlewareObj;