const ClassSchedule = require("../../models/class/schedule.model");

const validId = (req, res) => {
    if (!req.params || !req.params.id) {
        res.status(400).send({
            message: "Class schedule ID can not be empty!",
        });

        return false;
    }

    return true;
}

const validBody = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Class schedule can not be empty!",
        });

        return false;
    }

    return true;
}

const updateCb = (err, data) => {
    if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found class schedule with id ${req.params.id}.`,
            });
        } else {
            res.status(500).send({
                message: `Error updating class schedule with id ${req.params.id}`,
            });
        }
    } 
    
    res.send(data);
}

/**
 * Assign a schedule to a class
 */
exports.create = (req, res) => {
    // Validate request
    if (!req.body || !req.body.class_id) {
        res.status(400).send({
            message: "Class ID can not be empty!",
        });
    }

    const classSchedule = new ClassSchedule(req.body);

    // Save User into the database
    ClassSchedule.create(classSchedule, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message ||
                    "Something went wrong: Some error occurred while assigning schedule to the class",
            });
        }
            
        res.send(data);
    });
};

/**
 * Retrieve all class schedules
 */
exports.findAll = (req, res) => {
    ClassSchedule.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving class schedules.",
            });
        }
            
        res.send(data);
    });
};

/**
 * Retrieve a class schedule
 */
exports.findOne = (req, res) => {
    // Validate request
    if(!validId(req, res)) return;

    ClassSchedule.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No class schedule found for this id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving class schedule with id ${req.params.id}`,
                });
            }
        }
        
        res.send(data);
    });
};

/**
 * Delete class schedule
 */
exports.delete = (req, res) => {
    ClassSchedule.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found class schedule with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: `Could not delete class schedule with id ${req.params.id}`,
                });
            }
        } 
        
        res.send({ message: `Class schedule was deleted successfully!` });
    });
};

/**
 * Update Class schedule
 */
exports.update = (req, res) => {
    // Validate Update Request
    if (!validBody(req, res) || !validId(req, res)) return;

    ClassSchedule.update(req.params.id, new ClassSchedule(req.body), updateCb);
};

/**
 * Complete a class schedule
 */
exports.complete = (req, res) => {
    // Validate Update Request
    if (!validId(req, res)) return;

    ClassSchedule.complete(req.params.id, updateCb);
};

/**
 * Archive a class schedule
 */
exports.archive = (req, res) => {
    // Validate Update Request
    if (!validId(req, res)) return;

    ClassSchedule.archive(req.params.id, updateCb);
};

/**
 * Cancel a class schedule
 */
exports.cancel = (req, res) => {
    // Validate Update Request
    if (!validId(req, res)) return;

    ClassSchedule.cancel(req.params.id, updateCb);
};

/**
 * Cancel a class schedule
 */
exports.setInProgress = (req, res) => {
    // Validate Update Request
    if (!validId(req, res)) return;

    ClassSchedule.setInProgress(req.params.id, updateCb);
};