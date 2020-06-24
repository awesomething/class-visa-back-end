const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv")
 
dotenv.config();

// This will parse requests of content-type: application/json
app.use(bodyParser.json());

// this will parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ClassVisa API Platform" });
});

require("./app/routes/student/badges.routes.js")(app); // Badges Routes
require("./app/routes/student/profile.routes.js")(app); // Studen Profile Routes
require("./app/routes/users.routes.js")(app);  //User sign up Routes
require("./app/routes/class/schedule.routes.js")(app);  //Class schedule Routes
require("./app/routes/instructor/profile.routes.js")(app);  //Instructor profile Routes
// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});