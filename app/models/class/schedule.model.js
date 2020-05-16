const connection = require("../dbcon");
const { promisify } = require("util");

/**
 * A Class Schedule
 * 
 * @typedef {Object} ClassScheduleType
 * @property {number} class_id - The class id where the schedule belongs to
 * @property {Date} date - The date when the class happens
 * @property {Date} time - The time when the class happens
 * @property {ClassScheduleStatus} status - Current schedule status
 * @property {boolean} is_archived - Archived status
 * @property {Date} is_archived_date - Archived date
 * @property {Date} created_date - The date when the schedule was first created
 */

 /**
 * A Class Schedule Update Object
 * 
 * @typedef {Object} ClassScheduleUpdateType
 * @property {Date} date - The date when the class happens
 * @property {Date} time - The time when the class happens
 * @property {ClassScheduleStatus} status - Current schedule status
 * @property {boolean} is_archived - Archived status
 * @property {Date} is_archived_date - Archived date
 */

/**
 * Class schedule constructor
 * 
 * @class
 * @param {ClassScheduleType} classSchedule
 * @return {void}
 */
const ClassSchedule = function(classSchedule) {
    this.class_id = classSchedule.class_id;
    this.date = classSchedule.date; 
    this.time = classSchedule.time;
    this.status = CLASS_SCHEDULE_STATUS.SCHEDULED;
    this.is_archived = false; 
    this.is_archived_date = null;
    this.created_date = new Date(); 
};

/**
 * @typedef {number} ClassScheduleStatus
 */
const CLASS_SCHEDULE_STATUS = {
    SCHEDULED: 0,
    IN_PROGRESS: 1,
    COMPLETED: 2,
    CANCELED: 3,
};

/**
 * @const {string} TABLE_NAME
 */
const TABLE_NAME = 'class_schedule';

const promiseQuery = promisify(connection.query).bind(connection);

/**
 * Assign a schedule to a class
 * 
 * @param {ClassScheduleType} classScheduleData - The class schedule information
 * @param {Function} result - The result callback
 * @return {ClassScheduleType}
 */
ClassSchedule.create = async (classScheduleData, result) => {
    try {
        const { insertId: id } = await promiseQuery(`INSERT INTO ${TABLE_NAME} SET ?`, classScheduleData);
        const classScheduleObj = { id, ...classScheduleData };
        console.log("Schedule was successfully assigned to this class: ", classScheduleObj);
        result(null, classScheduleObj);
    } catch(err) {
        console.log("Error: ", err);
        result(err, null);
    }
};

/**
 * Get the class schedule information by id
 * 
 * @param {(number|string)} id - The class schedule id
 * @param {Function} result - The result callback
 * @return {ClassScheduleType}
 */
ClassSchedule.findById = async (id, result) => {
    try {
        const res = await promiseQuery(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`, [id]);

        if (res.length) {
            console.log("Found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    } catch(err) {
        console.log("Error: ", err);
        result(err, null);
    }
};

/**
 * Get the whole class schedule table
 * 
 * @param {Function} result - The result callback
 * @return {Object[]}
 */
ClassSchedule.getAll = async result => {
    try {
        const res = await promiseQuery(`SELECT * FROM ${TABLE_NAME}`);
        
        console.log("Class Schedules: ", res);
        result(null, res);
    } catch(err) {
        console.log("Error: ", err);
        result(err, null);
    }
};

/**
 * Delete a class schedule
 * 
 * @param {(int|string)} id - The class schedule id
 * @param {Function} result - The result callback
 * @return {boolean} 
 */
ClassSchedule.remove = async (id, result) => {
    try {
        const { affectedRows } = await promiseQuery(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, id);
        
        if (affectedRows == 0) {
            // not found class schedule with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Deleted class schedule with id: ", id);
        result(null, true);
    } catch(err) {
        console.log("Error: ", err);
        result(err, null);
    }
};

/**
 * Update a class schedule
 * 
 * @param {(string|number)} id - The class schedule id
 * @param {ClassScheduleUpdateType} updateData - The class schedule data to update
 * @param {Function} result - The result callback
 * @return {boolean} 
 */
ClassSchedule.update = async (id, updateData, result) => {
    try {
        const { affectedRows } = await promiseQuery(`UPDATE ${TABLE_NAME} SET ? WHERE id = ?`, [updateData, id]);
        
        if (affectedRows == 0) {
            // not found class schedule with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, true);
    } catch(err) {
        console.log("Error: ", err);
        result(err, null);
    }
};

/**
 * Archive a class schedule
 * 
 * @param {(int|string)} id - The class schedule id
 * @param {Function} result - The result callback
 * @return {boolean} 
 */
ClassSchedule.archive = (id, result) => {
    return this.update(id, {
        is_archived: true,
        is_archived_date: new Date(),
    }, result);
};

/**
 * Move schedule to in progress
 * 
 * @param {(int|string)} id - The class schedule id
 * @param {Function} result - The result callback
 * @return {boolean} 
 */
ClassSchedule.setInProgress = (id, result) => {
    return this.update(id,{
        status: CLASS_SCHEDULE_STATUS.IN_PROGRESS,
    }, result);
};

/**
 * Complete a schedule
 * 
 * @param {(int|string)} id - The class schedule id
 * @param {Function} result - The result callback
 * @return {boolean} 
 */
ClassSchedule.complete = (id, result) => {
    return this.update(id,{
        status: CLASS_SCHEDULE_STATUS.COMPLETED,
    }, result);
};

/**
 * Cancel a schedule
 * 
 * @param {(int|string)} id - The class schedule id
 * @param {Function} result - The result callback
 * @return {boolean} 
 */
ClassSchedule.cancel = (id, result) => {
    return this.update(id,{
        status: CLASS_SCHEDULE_STATUS.CANCELED,
    }, result);
};

module.exports = ClassSchedule;