module.exports = app => {
    const users = require("../controllers/users.controller");
    const { validate, wrapRouteCb } = require("../helpers/route-wrappers");
  
    // Register a new user
    app.post("/users", validate(users.validators.create), wrapRouteCb(users.create));
  
    // Retrieve all user
    app.get("/users", wrapRouteCb(users.findAll));
  
    // Retrieve a single user with id
    app.get("/users/:id", validate(users.validators.find), wrapRouteCb(users.findOne));
  
    // Update a user with id
    app.put("/users/:id", validate(users.validators.update), wrapRouteCb(users.update));
  
    // Delete a user with id
    app.delete("/users/:id", validate(users.validators.delete), wrapRouteCb(users.delete));
  
    // delete all a new users
    //app.delete("/users", users.deleteAll);
  };