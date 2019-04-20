// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends.
// ===============================================================================

var friends = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friends);
    console.log(friends);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the friends array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Our "server" will respond to requests and let user know which friend they are most compatible with.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware

      var newfriend = req.body;

      // Using a RegEx Pattern to remove spaces from newCharacter
      // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
      newfriend.routeName = newfriend.name.replace(/\s+/g, "").toLowerCase();
    
      console.log(newfriend);
    
      friends.push(newfriend);
    
      res.json(newfriend);
    
  });

};
