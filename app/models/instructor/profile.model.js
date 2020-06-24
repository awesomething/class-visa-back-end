const connection = require("../dbcon");
const { promisify } = require("util");

/**
 * A Instructor Profile
 *
 * @typedef {Object} InstructorProfileType
 * @property {number} instructor_id - User id where the profile belongs to
 * @property {string} gym_name - Gym name
 * @property {string} gym_address - Gym address
 * @property {string} contact_firstname - Instructor first name
 * @property {string} contact_lastname - Instructor last name
 * @property {string} mobile - Instructor mobile number
 */

/**
 * A Instructor Profile Update Object
 *
 * @typedef {Object} InstructorProfileUpdateType
 * @property {string} gym_name - Gym name
 * @property {string} gym_address - Gym address
 * @property {string} contact_firstname - Instructor first name
 * @property {string} contact_lastname - Instructor last name
 * @property {string} mobile - Instructor mobile number
 */

/**
 * Instructor profile constructor
 *
 * @class
 * @param {InstructorProfileType} instructorProfile
 * @return {void}
 */
const InstructorProfile = function (instructorProfile) {
    this.instructor_id = instructorProfile.instructor_id;
    this.gym_name = instructorProfile.gym_name;
    this.gym_address = instructorProfile.gym_address;
    this.contact_firstname = instructorProfile.contact_firstname;
    this.contact_lastname = instructorProfile.contact_lastname;
    this.mobile = instructorProfile.mobile;
};

/**
 * @const {string} TABLE_NAME
 */
const TABLE_NAME = "instructor_profile";

const promiseQuery = promisify(connection.query).bind(connection);

/** Prototype methods */
/**
 * Get object for update
 *
 * @return {InstructorProfileUpdateType}
 */
InstructorProfile.prototype.getUpdateObj = function () {
    const { gym_name, gym_address, contact_firstname, contact_lastname, mobile } = this;

    return {
        gym_name,
        gym_address,
        contact_firstname,
        contact_lastname,
        mobile
    };
};

/** Static methods */

/**
 * Assign a instructor to a class
 *
 * @param {InstructorProfileType} instructorProfileData - The instructor profile information
 * @param {Function} result - The result callback
 * @return {InstructorProfileType}
 */
InstructorProfile.create = async (instructorProfileData, result) => {
    try {
        const { insertId: id } = await promiseQuery(
            `INSERT INTO ${TABLE_NAME} SET ?`,
            instructorProfileData
        );
        const instructorProfileObj = { id, ...instructorProfileData };
        console.log("Profile was successfully created: ", instructorProfileObj);
        result(null, studentProfileObj);
    } catch (err) {
        console.log("Error: ", err);
        result(err, null);
    }
};

/**
 * Get the instructor profile by id
 *
 * @param {(number|string)} id - The instructor profile id
 * @param {Function} result - The result callback
 * @return {InstructorProfileType}
 */
InstructorProfile.findById = async (id, result) => {
    try {
        const res = await promiseQuery(
            `SELECT * FROM ${TABLE_NAME} WHERE id = ?`,
            [id]
        );

        if (res.length) {
            console.log("Found instructor profile: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    } catch (err) {
        console.log("Error: ", err);
        result(err, null);
    }
};

/**
 * Get the whole class instructor profile table
 *
 * @param {Function} result - The result callback
 * @return {InstructorProfileType[]}
 */
InstructorProfile.getAll = async (result) => {
    try {
        const res = await promiseQuery(`SELECT * FROM ${TABLE_NAME}`);

        console.log("Instructor profiles: ", res);
        result(null, res);
    } catch (err) {
        console.log("Error: ", err);
        result(err, null);
    }
};

/**
 * Delete a instructor profile
 *
 * @param {(int|string)} id - The instructor id
 * @param {Function} result - The result callback
 * @return {boolean}
 */
InstructorProfile.remove = async (id, result) => {
    try {
        const { affectedRows } = await promiseQuery(
            `DELETE FROM ${TABLE_NAME} WHERE id = ?`,
            id
        );

        if (affectedRows == 0) {
            // not found student profile with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Deleted instructor profile with id: ", id);
        result(null, true);
    } catch (err) {
        console.log("Error: ", err);
        result(err, null);
    }
};

/**
 * Update a instructor profile
 *
 * @param {(string|number)} id - The instructor profile id
 * @param {ScheduleProfileUpdateType} updateData - The instructor profile data to update
 * @param {Function} result - The result callback
 * @return {boolean}
 */
InstructorProfile.update = async (id, updateData, result) => {
    try {
        const {
            affectedRows,
        } = await promiseQuery(`UPDATE ${TABLE_NAME} SET ? WHERE id = ?`, [
            updateData,
            id,
        ]);

        if (affectedRows == 0) {
            // not found student profile with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, true);
    } catch (err) {
        console.log("Error: ", err);
        result(err, null);
    }
};

module.exports = InstructorProfile;
