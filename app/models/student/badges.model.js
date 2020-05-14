const sql = require("./dbcon.js");
// constructor
const badge = function(badge) {
  this.student_id = badge.student_id;
  this.issued_date = new Date(); //badge.issued_date;
  this.status = 0; //badge.status;
};

//Assign Badge
badge.create = (badgeinfo, result) => {
  query("INSERT INTO badges SET ?", badgeinfo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Badge was successfully assigned to this employee: ", { id: res.badgeinfo, ...badgeinfo });
    result(null, { id: res.insertId, ...badgeinfo });
  });
};

//Get single badge
badge.findById = (id, result) => {
  query(`SELECT * FROM badges WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // badge not found user with the id
    result({ kind: "not_found" }, null);
  });
};

users.getAll = result => {
  query("SELECT * FROM badges", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Badges: ", res);
    result(null, res);
  });
};


//Delete a record
users.remove = (id, result) => {
  query("DELETE FROM badges WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found user with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted student badge with id: ", id);
    result(null, res);
  });
};

module.exports = badge;