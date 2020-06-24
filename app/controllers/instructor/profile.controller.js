const InstructorProfile = require("../../models/instructor/profile.model");

const validId = (req, res) => {
    if (!req.params || !req.params.id) {
        res.status(400).send({
            message: "Instructor profile ID can not be empty!",
        });

        return false;
    }

    return true;
};

const validBody = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Instructor profile can not be empty!",
        });

        return false;
    }

    return true;
};

/**
 * Create a Instructor profile
 */
exports.create = (req, res) => {
    // Validate request
    if (!req.body || !req.body.instructor_id) {
        res.status(400).send({
            message: "Instructor ID can not be empty!",
        });
    }

    const instructorProfile = new InstructorProfile(req.body);

    // Save instructor profile into the database
    InstructorProfile.create(instructorProfile, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message ||
                    "Something went wrong: Some error occurred while creating instructor profile",
            });
        }

        res.send(data);
    });
};

/**
 * Retrieve all instructor profiles
 */
exports.findAll = (req, res) => {
    InstructorProfile.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving instructor profiles.",
            });
        }

        res.send(data);
    });
};

/**
 * Retrieve a instructor profile
 */
exports.findOne = (req, res) => {
    // Validate request
    if (!validId(req, res)) return;

    InstructorProfile.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No instructor profile found for this id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving instructor profile with id ${req.params.id}`,
                });
            }
        }

        res.send(data);
    });
};

/**
 * Delete instructor profile
 */
exports.delete = (req, res) => {
    InstructorProfile.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found instructor profile with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: `Could not delete instructor profile with id ${req.params.id}`,
                });
            }
        }

        res.send({ message: `Instructor profile was deleted successfully!` });
    });
};

/**
 * Update instructor Profile
 */
exports.update = (req, res) => {
    // Validate Update Request
    if (!validBody(req, res) || !validId(req, res)) return;

    const instructorProfile = new InstructorProfile(req.body);

    InstructorProfile.update(
        req.params.id,
        instructorProfile.getUpdateObj(),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found instructor profile with id ${req.params.id}.`,
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating instructor profile with id ${req.params.id}`,
                    });
                }
            }

            res.send(data);
        }
    );
};
