const sql = require("./dbcon.js");
// constructor
const users = function(users) {
  this.email = users.email;
  this.password = users.password;
  this.reffered_by = users.reffered_by;
  this.account_status =0;
  this.user_type = users.user_type;
  this.active = true;
  this.created_date = new Date();
};

users.create = (newuser, result) => {
  query("INSERT INTO users SET ?", newuser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("user was created successfully: ", { id: res.insertId, ...newuser });
    result(null, { id: res.insertId, ...newuser });
  });
};

users.findById = (userId, result) => {
  query(`SELECT * FROM users WHERE user_d = ${userId}`, (err, res) => {
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

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

users.getAll = result => {
  query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

//Archiving user
users.updateById = (id, users, result) => {
  query(
    "UPDATE users SET is_active = ?, account_status =  WHERE user_id = ?",
    [users.active, 'false', id],
    (err, res) => {
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

      console.log("updated users: ", { id: id, ...users });
      result(null, { id: id, ...users });
    }
  );
};


//Delete a record
users.remove = (id, result) => {
  query("DELETE FROM users WHERE id = ?", id, (err, res) => {
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

    console.log("deleted users with id: ", id);
    result(null, res);
  });
};

//Customer.removeAll = result => {
  //query("DELETE FROM users", (err, res) => {
   // if (err) {
   //   console.log("error: ", err);
   //   result(null, err);
   //   return;
   // }

   // console.log(`deleted ${res.affectedRows} users`);
   // result(null, res);
  //});
//};

module.exports = users;