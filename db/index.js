/**
 * @Author: schwarze_falke
 * @Date:   2018-10-07T20:34:36-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-08T03:16:46-05:00
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
    try {
      this.connection.connect();
    } catch (e) {
      console.error(`try/catch(${e})`);
    }
  }

  get(table, columns, condition, order) {
    return new Promise((resolve, reject) => {
      const data = [columns, table];
      let query = 'SELECT ?? FROM ??'; // avoid logical deleted data
      query += ' WHERE exist = TRUE';
      if (condition) query += ` && ${condition}`;
      if (order) query += order;
      query += ';';
      this.connection.query(query, data, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  insert(table, data, condition) {
    return new Promise((resolve, reject) => {
      let query = 'INSERT INTO ?? SET ?';
      if (condition) {
        query += `WHERE ${condition};`;
      } else { query += ';'; }
      this.connection.query(query, [table, data], (err, results) => {
        if (err) {
          reject(err);
        }
        return resolve(results);
      });
    });
  }

  update(table, data, condition) {
    return new Promise((resolve, reject) => {
      let query = 'UPDATE ?? SET ?';
      if (condition) query += ` WHERE ${condition};`;
      else query += ';';
      this.connection.query(query, [table, data], (err, results) => {
        if (results.affectedRows === 0) reject(new Error('Doesnt exist'));
        if (err) reject(err);
        return resolve(results);
      });
    });
  }

  physicalDel(table, condition) {
    return new Promise((resolve, reject) => {
      let query = 'DELETE FROM ??';
      if (condition) query += ` WHERE ${condition};`;
      else query += ';';
      this.connection.query(query, table, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  logicalDel(table, condition) {
    return new Promise((resolve, reject) => {
      let query = 'UPDATE ?? SET exist = 0';
      if (condition) query += ` WHERE ${condition}`;
      this.connection.query(query, table, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}
module.exports = new DB();
