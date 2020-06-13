const StudentProfile = require("../../models/student/profile.model");

const validId = (req, res) => {
    if (!req.params || !req.params.id) {
        res.status(400).send({
            message: "Student profile ID can not be empty!",
        });

        return false;
    }

    return true;
};

const validBody = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Student profile can not be empty!",
        });

        return false;
    }

    return true;
};

/**
 * Create a student profile
 */
exports.create = (req, res) => {
    // Validate request
    if (!req.body || !req.body.student_id) {
        res.status(400).send({
            message: "Student ID can not be empty!",
        });
    }

    const studentProfile = new StudentProfile(req.body);

    // Save student profile into the database
    StudentProfile.create(studentProfile, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message ||
                    "Something went wrong: Some error occurred while creating student profile",
            });
        }

        res.send(data);
    });
};

/**
 * Retrieve all student profiles
 */
exports.findAll = (req, res) => {
    StudentProfile.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving student profiles.",
            });
        }

        res.send(data);
    });
};

/**
 * Retrieve a student profile
 */
exports.findOne = (req, res) => {
    // Validate request
    if (!validId(req, res)) return;

    StudentProfile.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No student profile found for this id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving student profile with id ${req.params.id}`,
                });
            }
        }

        res.send(data);
    });
};

/**
 * Delete student profile
 */
exports.delete = (req, res) => {
    StudentProfile.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found student profile with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: `Could not delete student profile with id ${req.params.id}`,
                });
            }
        }

        res.send({ message: `Student profile was deleted successfully!` });
    });
};

/**
 * Update Student Profile
 */
exports.update = (req, res) => {
    // Validate Update Request
    if (!validBody(req, res) || !validId(req, res)) return;

    const studentProfile = new StudentProfile(req.body);

    StudentProfile.update(
        req.params.id,
        studentProfile.getUpdateObj(),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found student profile with id ${req.params.id}.`,
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating student profile with id ${req.params.id}`,
                    });
                }
            }

            res.send(data);
        }
    );
};
