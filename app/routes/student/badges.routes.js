module.exports = app => {
    const badge = require("../../controllers/student/badges.controller.js");
  
    // Assign a badge to user
    app.post("/badges", badge.create);
  
    // Get all user
    app.get("/badges", badge.findAll);
  
    // Get a single user with userId
    app.get("/badges/:id", badge.findOne);
  
    // Update a user badge with userId
    app.put("/badges/:id", badge.update);
  
    // Delete a user with userId
    //app.delete("/badges/:id", badge.delete);
  
  };