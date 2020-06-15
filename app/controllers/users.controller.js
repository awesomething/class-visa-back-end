const User = require("../models/users.model.js");
const { check } = require("express-validator");
const { NotFoundError } = require("../helpers/error");

const validators = {};

// Create and Save a new user
validators.create = [
    check("email").isEmail(),
    check("password").isLength({ min: 6 }),
];

exports.create = async (req, res) => {
    const data = await User.create(req.body);

    res.send(data);
};

// Retrieve all users from the database.
exports.findAll = async (req, res, next) => {
    const data = await User.findAll();

    res.send(data);
};

// Find a single user with a userId
validators.find = [
    check("id").notEmpty(),
];
exports.findOne = async (req, res) => {
    const data = await User.findByPk(req.params.id);

    if (!data) throw new NotFoundError("User not found");

    res.send(data);
};

// Update a user profile identified by the userId in the request -- archive/change status
validators.update = [
    check("id").notEmpty(),
    check("password").isLength({ min: 6 }),
];
exports.update = async (req, res) => {
    const result = await User.updateById(req.params.id, req.body);

    if (!result) throw new NotFoundError("User not found");

    res.send(data);
};

// Delete a user with the specified userId in the request
validators.delete = [
    check("id").notEmpty(),
];
exports.delete = async (req, res) => {
    const result = await User.deleteById(req.params.id);

    if (!result) throw new NotFoundError("User not found");

    res.send({ message: `User was deleted successfully!` });
};

exports.validators = validators;
