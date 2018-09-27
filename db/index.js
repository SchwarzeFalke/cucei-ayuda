/**
 * @Author: schwarze_falke
 * @Date:   2018-09-20T10:18:54-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-26T20:00:43-05:00
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

  async getAll(table, columns, condition) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT ?? FROM ??';
      const data = [columns, table];
      if (condition) {
        query += `WHERE ${condition};`;
      } else { query += ';'; }

      this.connection.query(query, data, (err, results) => {
        if (err) throw reject(err);
        resolve(results);
      });
    });
  }

  get(table, arg1, arg2) {
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT * FROM ${table} WHERE ${arg1} = ${arg2}`,
        (err, results) => {
          if (err) throw reject(err);
          resolve(results);
        });
    });
  }

  async insert(table, data) {
    return new Promise((resolve, reject) => {
      this.connection.query('INSERT INTO ?? SET ?;', [table, data], (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  }

  /*
  insert(table, data, body) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO '.concat(`${table}`);
      const sql2 = `${sql} SET ?`;
      this.connection.query(sql2, body, (err, results) => {
        if (err) throw reject(err);
        resolve(results);
      });
    });
  }
  */

  del(table, arg1, arg2) {
    return new Promise((resolve, reject) => {
      this.connection.query(`DELETE FROM ${table} WHERE ${arg1} = ${arg2}`,
        (err, results) => {
          if (err) throw reject(err);
          resolve(results);
        });
    });
  }
}

module.exports = new DB();
