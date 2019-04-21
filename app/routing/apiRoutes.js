// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends.
// ===============================================================================

var friendData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function (req, res) {
    res.json(friendData);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the friends array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function (req, res) {
    // Our "server" will respond to requests and let user know which friend they are most compatible with.
    // req.body is available since we're using the body parsing middleware

    var newfriend = req.body;

    var bestdiff = 100;
    var bestfriend = { name: "", photo: "" };
    for (var j = 0; j < friendData.length; j++) {
      var diff = 0;
      for (var i = 0; i < friendData[j].scores.length; i++) {
        diff += Math.abs(parseInt(newfriend.scores[i]) - parseInt(friendData[j].scores[i]));
      }
      if (diff < bestdiff) {
        bestfriend.name = friendData[j].name;
        bestfriend.photo = friendData[j].photo;
        bestdiff=diff;
      }
    }

    console.log(bestfriend);

    console.log(newfriend);
    // Push new friend to the friends array
    friendData.push(newfriend);
    //send best friend json to the client side
    res.json(bestfriend);
  })
};

