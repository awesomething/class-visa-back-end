module.exports = (app) => {
    const studentProfile = require("../../controllers/student/profile.controller.js");

    // Create a student profile
    app.post("/student/profile", studentProfile.create);

    // Get all student profiles
    app.get("/student/profile", studentProfile.findAll);

    // Get a single student profile
    app.get("/student/profile/:id", studentProfile.findOne);

    // Update a student profile
    app.put("/student/profile/:id", studentProfile.update);

    // Delete a student profile
    app.delete("/student/profile/:id", studentProfile.delete);
};
