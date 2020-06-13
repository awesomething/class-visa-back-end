const connection = require("../dbcon");
const { promisify } = require("util");

/**
 * A Student Profile
 *
 * @typedef {Object} StudentProfileType
 * @property {number} student_id - User id where the profile belongs to
 * @property {string} first_name - Student last name
 * @property {string} last_name - Student first name
 * @property {string} phone - Student phone
 * @property {string} contact_address - Student address
 */

/**
 * A Student Profile Update Object
 *
 * @typedef {Object} StudentProfileUpdateType
 * @property {string} first_name - Student last name
 * @property {string} last_name - Student first name
 * @property {string} phone - Student phone
 * @property {string} contact_address - Student address
 */

/**
 * Student profile constructor
 *
 * @class
 * @param {StudentProfileType} studentProfile
 * @return {void}
 */
const StudentProfile = function (studentProfile) {
    this.student_id = studentProfile.student_id;
    this.first_name = studentProfile.first_name;
    this.last_name = studentProfile.last_name;
    this.phone = studentProfile.phone;
    this.contact_address = studentProfile.contact_address;
};

/**
 * @const {string} TABLE_NAME
 */
const TABLE_NAME = "student_profile";

const promiseQuery = promisify(connection.query).bind(connection);

/** Prototype methods */
/**
 * Get object for update
 *
 * @return {StudentProfileUpdateType}
 */
StudentProfile.prototype.getUpdateObj = function () {
    const { first_name, last_name, contact_address, phone } = this;

    return {
        first_name,
        last_name,
        contact_address,
        phone,
    };
};

/** Static methods */

/**
 * Assign a schedule to a class
 *
 * @param {StudentProfileType} studentProfileData - The student profile information
 * @param {Function} result - The result callback
 * @return {StudentProfileType}
 */
StudentProfile.create = async (studentProfileData, result) => {
    try {
        const { insertId: id } = await promiseQuery(
            `INSERT INTO ${TABLE_NAME} SET ?`,
            studentProfileData
        );
        const studentProfileObj = { id, ...studentProfileData };
        console.log("Profile was successfully created: ", studentProfileObj);
        result(null, studentProfileObj);
    } catch (err) {
        console.log("Error: ", err);
        result(err, null);
    }
};

/**
 * Get the student profile by id
 *
 * @param {(number|string)} id - The student profile id
 * @param {Function} result - The result callback
 * @return {StudentProfileType}
 */
StudentProfile.findById = async (id, result) => {
    try {
        const res = await promiseQuery(
            `SELECT * FROM ${TABLE_NAME} WHERE id = ?`,
            [id]
        );

        if (res.length) {
            console.log("Found student profile: ", res[0]);
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
 * Get the whole class student profile table
 *
 * @param {Function} result - The result callback
 * @return {StudentProfileType[]}
 */
StudentProfile.getAll = async (result) => {
    try {
        const res = await promiseQuery(`SELECT * FROM ${TABLE_NAME}`);

        console.log("Student profiles: ", res);
        result(null, res);
    } catch (err) {
        console.log("Error: ", err);
        result(err, null);
    }
};

/**
 * Delete a student profile
 *
 * @param {(int|string)} id - The class schedule id
 * @param {Function} result - The result callback
 * @return {boolean}
 */
StudentProfile.remove = async (id, result) => {
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

        console.log("Deleted student profile with id: ", id);
        result(null, true);
    } catch (err) {
        console.log("Error: ", err);
        result(err, null);
    }
};

/**
 * Update a student profile
 *
 * @param {(string|number)} id - The student profile id
 * @param {ScheduleProfileUpdateType} updateData - The student profile data to update
 * @param {Function} result - The result callback
 * @return {boolean}
 */
StudentProfile.update = async (id, updateData, result) => {
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

module.exports = StudentProfile;
