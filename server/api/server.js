/* eslint-disable no-unused-vars */
const express = require('express');
const dbParams = require('../../_config.js');
const mysql = require('mysql');
const router = express.Router();
const app = express();
const port = 9000;

const { host, user, password, database } = dbParams;

const getDbLink = () => {
  const connection = mysql.createConnection({ host, password, user, database });
  connection.connect();
  return connection;
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router.use((req, res, next) => {
  next();
});
app.use('/api', router);
// eslint-disable-next-line no-console
app.listen(port, () => { console.log(`Magic happens on port ${port} !`); });
