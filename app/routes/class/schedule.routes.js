module.exports = app => {
    const classSchedule = require("../../controllers/class/schedule.controller.js");
  
    // Assign a schedule to a class
    app.post("/class/schedule", classSchedule.create);
  
    // Get all class schedules
    app.get("/class/schedule", classSchedule.findAll);
  
    // Get a single class schedule
    app.get("/class/schedule/:id", classSchedule.findOne);

    // Update a class schedule
    app.put("/class/schedule/:id", classSchedule.update);

    // Archive a class schedule
    app.put("/class/schedule/:id/archive", classSchedule.archive);

    // Complete a class schedule with
    app.put("/class/schedule/:id/complete", classSchedule.complete);

    // Cancel a class schedule with
    app.put("/class/schedule/:id/cancel", classSchedule.cancel);

    // Set a class schedule to in progress
    app.put("/class/schedule/:id/in-progress", classSchedule.setInProgress);
  
    // Delete a class schedule
    app.delete("/class/schedule/:id", classSchedule.delete);
  
  };