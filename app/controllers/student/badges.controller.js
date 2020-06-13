const badge = require("../../models/student/badges.model.js").default;

// Assign badge to new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Student ID can not be empty!"
    });
};
// Create a User
const badge = new badge({
    student_id: req.body.student_id
  });

// Save User into the database
user.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Something went wrong: Some error occurred while assigning badge to the user"
      });
    else res.send(data);
  });
};


/// Retrieve all users from the database.
exports.findAll = (req, res) => {
    badge.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving user details."
        });
      else res.send(data);
    });
  };
  
  // Find a single user badge a userId
  exports.findOne = (req, res) => {
    badge.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No badge found for this user with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };
  
  // Update a user badge by the badgeId in the request -- archive/change status
  exports.update = (req, res) => {
  // Validate Update Request
  if (!req.body) {
    res.status(400).send({
      message: "user details can not be empty!"
    });
  }
  
  badge.updateById(
    req.params.id,
    new badge(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found for the badge with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating user's badge with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
  };
  
  // Delete a user with the specified userId in the request
  exports.delete = (req, res) => {
    badge.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user badge details with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete user badge details with id " + req.params.id
          });
        }
      } else res.send({ message: `User badge was deleted successfully!` });
    });
  };