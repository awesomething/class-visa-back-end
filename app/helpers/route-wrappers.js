const { validationResult } = require("express-validator");
const { BadRequestError } = require("./error");

const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        next(new BadRequestError("Validation Error", errors));
    };
};

const wrapRouteCb = (fn) => (...args) => fn(...args).catch(args[2]);

module.exports = {
    validate,
    wrapRouteCb,
};