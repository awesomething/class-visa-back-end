const User = require("../models/users.model.js");

// Create and Save a new user
exports.create = async (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "User details can not be empty!"
    });
  }
};

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await User.findAll();
    
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving user details."
    });
  }
};

// Find a single user with a userId
exports.findOne = async (req, res) => {
  try {
    const data = await User.findByPk(req.params.userId);

    if(!data) {
      return res.status(404).send({
        message: `Not found User with id ${req.params.userId}.`
      });
    }

    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: "Error retrieving User with id " + req.params.userId
    });
  }
};

// Update a user profile identified by the userId in the request -- archive/change status
exports.update = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "user details can not be empty!"
      });
    }

    const result = await User.update(req.body, { where: { id: req.params.userId } });

    if(!result) {
      return res.status(404).send({
        message: `Not found userId with id ${req.params.userId}.`
      });
    }

    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: "Error updating user details with userid " + req.params.userId
    });
  }
};

// Delete a user with the specified userId in the request
exports.delete = async (req, res) => {
  try {
    const result = await User.destroy({ where: { id: req.params.userId } });

    if(!result) {
      return res.status(404).send({
        message: `Not found userId with id ${req.params.userId}.`
      });
    }

    res.send({ message: `User was deleted successfully!` });
  } catch(err) {
    res.status(500).send({
      message: "Could not delete user with id " + req.params.userId
    });
  }
};
