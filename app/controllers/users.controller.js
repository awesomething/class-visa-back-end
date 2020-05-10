const users = require("../models/users.model.js").default;

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "User details can not be empty!"
    });
};
// Create a User
const user = new user({
    email: req.body.email,
    password: req.body.password,
    referred_by: req.referred_by,
    user_type: req.user_type
  });

// Save User into the database
users.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Something went wrong: Some error occurred while creating the user"
      });
    else res.send(data);
  });
};


// Retrieve all users from the database.
exports.findAll = (req, res) => {
  users.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user details."
      });
    else res.send(data);
  });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  users.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};

// Update a user profile identified by the userId in the request -- archive/change status
exports.update = (req, res) => {
// Validate Update Request
if (!req.body) {
  res.status(400).send({
    message: "user details can not be empty!"
  });
}

users.updateById(
  req.params.userId,
  new users(req.body),
  (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found userId with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating user details with userid " + req.params.userId
        });
      }
    } else res.send(data);
  }
);
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  users.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user details with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete user with id " + req.params.userId
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

// Delete all users from the database (Not needed for this part but can serve other routes).
//exports.deleteAll = (req, res) => {
//  users.remove(req.params.userId, (err, data) => {
//    if (err) {
//      if (err.kind === "not_found") {
//        res.status(404).send({
//          message: `Not found user with id ${req.params.userId}.`
//        });
//      } else {
//        res.status(500).send({
//          message: "Could not delete user with id " + req.params.userId
//        });
//      }
//    } else res.send({ message: `User detail was deleted successfully!` });
//  });
//};