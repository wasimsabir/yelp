var mongoose = require("mongoose");
var Comment = require("./models/comment");
var Campground = require("./models/campground");
var data = [
  {
  "name": "Top camps in America",
  "image": "https://images.pexels.com/photos/14287/pexels-photo-14287.jpeg?auto=compress&cs=tinysrgb&h=350",
  "description": "Bacon ipsum dolor amet flank cupim turkey, venison hamburger pig shank leberkas short loin burgdoggen sausage chicken. Doner ribeye kevin, tail pig porchetta venison drumstick ball tip."
},
{
  "name": "Forest Camp",
  "image": "https://images.pexels.com/photos/730426/pexels-photo-730426.jpeg?auto=compress&cs=tinysrgb&h=350",
  "description": "Bacon ipsum dolor amet flank cupim turkey, venison hamburger pig shank leberkas short loin burgdoggen sausage chicken. Doner ribeye kevin, tail pig porchetta venison drumstick ball tip."
},
{
  "name": "Camps in Austrailia",
  "image": "https://images.pexels.com/photos/216678/pexels-photo-216678.jpeg?auto=compress&cs=tinysrgb&h=350",
  "description": "Bacon ipsum dolor amet flank cupim turkey, venison hamburger pig shank leberkas short loin burgdoggen sausage chicken. Doner ribeye kevin, tail pig porchetta venison drumstick ball tip."
}
];

function seedDb() {

  //remove all campgrounds
Campground.remove({}, function(err){

  if(err){
    console.log(err);
  }
  else{
    console.log("Campgrounds removed");
  }
});


// // add few campgrounds
// data.forEach(function(el){
//   Campground.create(el, function(err, addedCampgrounds){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log("Camps added");


//       // create comments
//       Comment.create({
//         "text": "This is a sizzling campground.",
//         "author": "Wasim Ali"
//       }, function(err, createdComment){
//           if(err){
//             console.log(err);
//           }
//           else{


//             // add comments
//             addedCampgrounds.comments.push(createdComment);
//             addedCampgrounds.save();
//             console.log("Comments created");
//           }
//       });
      
//     }

//   });  // end camp create
// });   // end foreach




} // seedDb end

module.exports = seedDb;