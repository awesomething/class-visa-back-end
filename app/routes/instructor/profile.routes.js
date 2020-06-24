module.exports = (app) => {
    const instructorProfile = require("../../controllers/instructor/profile.controller");

    // Create a instructor profile
    app.post("/instructor/profile", instructorProfile.create);

    // Get all instructor profiles
    app.get("/instructor/profile", instructorProfile.findAll);

    // Get a single instructor profile
    app.get("/instructor/profile/:id", instructorProfile.findOne);

    // Update a instructor profile
    app.put("/instructor/profile/:id", instructorProfile.update);

    // Delete a instructor profile
    app.delete("/instructor/profile/:id", instructorProfile.delete);
};
