/**
 * @Author: schwarze_falke
 * @Date:   2018-09-20T10:18:54-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-21T21:59:14-05:00
 */

const mysql = require('mysql');

class DB {
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    this.connection.connect();
  }

  query() {
    this.connection.query('SELECT 1 + 1 AS solution', (err, results) => {
      if (err) throw err;
      console.log('The solution is: ', results[0].solution);
    });
  }

  getAll(table) {
    this.connection.query(`SELECT * FROM ${table}`, (err, results) => {
      if (err) throw err;
      this.result = results;
    });

    return this.result;
  }

  get(table, arg1, arg2) {
    this.connection.query(`SELECT * FROM ${table} WHERE ${arg1} = ${arg2}`,
      (err, results) => {
        if (err) throw err;
        this.result = results;
      });

    return this.result;
  }

  insert(table, data, body) {
    const sql = 'INSERT INTO '.concat(`${table}`);
    const sql2 = `${sql} SET ?`;
    this.connection.query(sql2, body, (err, results) => {
      if (err) throw err;
      this.result = results;
    });

    return this.result;
  }

  del(table, arg1, arg2) {
    this.connection.query(`DELETE FROM ${table} WHERE ${arg1} = ${arg2}`,
      (err, results) => {
        if (err) throw err;
        this.result = results;
      });

    return this.result;
  }
}

module.exports = new DB();
