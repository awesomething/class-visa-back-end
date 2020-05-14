module.exports = app => {
    const users = require("../controllers/users.controller.js");
  
    // Register a new user
    app.post("/users", users.create);
  
    // Retrieve all user
    app.get("/users", users.findAll);
  
    // Retrieve a single user with userId
    app.get("/users/:userId", users.findOne);
  
    // Update a user with userId
    app.put("/users/:userId", users.update);
  
    // Delete a user with userId
    app.delete("/users/:userId", users.delete);
  
    // delete all a new users
    //app.delete("/users", users.deleteAll);
  };