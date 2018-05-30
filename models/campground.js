var mongoose = require("mongoose");
var Comment = require("./comment");

var campGroundsSchema = new mongoose.Schema({
  
  "name": String,
  "image": String,
  "description": String,
  "price": Number,
  "author": {
      "id": {
        "type": mongoose.Schema.Types.ObjectId,
        "ref": "User"
      },
      "username": String
  },
  "comments": [
    {"type": mongoose.Schema.Types.ObjectId, "ref": "Comment"}
  ],
  "created": {"type": Date, "default": Date.now}
});

module.exports = mongoose.model("Campground", campGroundsSchema);