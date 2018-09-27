/**
 * @Author: schwarze_falke
 * @Date:   2018-09-20T10:18:54-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-27T02:38:36-05:00
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

  async get(table, columns, condition) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT ?? FROM ?? WHERE exist = TRUE'; // avoid logical deleted data
      const data = [columns, table];
      if (condition) {
        query += `&& ${condition};`;
      } else { query += ';'; }

      this.connection.query(query, data, (err, results) => {
        if (err) throw reject(err);
        resolve(results);
      });
    });
  }

  async insert(table, data, condition) {
    return new Promise((resolve, reject) => {
      let query = 'INSERT INTO ?? SET ?';
      if (condition) {
        query += `WHERE ${condition};`;
      } else { query += ';'; }
      this.connection.query(query, [table, data], (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  }

  async update(table, data, condition) {
    return new Promise((resolve, reject) => {
      let query = 'UPDATE ?? SET ?';
      if (condition) {
        query += `WHERE ${condition};`;
      } else { query += ';'; }
      this.connection.query(query, [table, data], (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  }

  async del(table, condition) {
    return new Promise((resolve, reject) => {
      let query = 'DELETE FROM ??';
      if (condition) {
        query += `WHERE ${condition};`;
      } else { query += ';'; }
      this.connection.query(query, (err, results) => {
        if (err) throw reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = new DB();
