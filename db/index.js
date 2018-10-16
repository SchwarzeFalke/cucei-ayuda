/**
 * @Author: schwarze_falke
 * @Date:   2018-10-08T14:34:11-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-09T06:07:20-05:00
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
  }

  get(table, columns, condition, order) {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    return new Promise((resolve, reject) => {
      // const data = [columns, table];
      let query = 'SELECT ?? FROM ??'; // avoid logical deleted data
      if (columns === '*') {
        query = 'SELECT * FROM ??';
      }
      else{
        query = `SELECT ${columns} FROM ??`;
      }
      query += ' WHERE exist = TRUE';
      if (condition) {
        query += ` && ${condition}`;
      }
      if (order){
        query += order;
      }
      query += ';';
      this.connection.query(query, table, (err, results) => {
        if (err) {
          reject(err);
        }
        this.connection.destroy();
        resolve(results);
      });
    });
  }

  insert(table, data, condition) {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    return new Promise((resolve, reject) => {
      let query = 'INSERT INTO ?? SET ?';
      if (condition) {
        query += `WHERE ${condition};`;
      } else { query += ';'; }
      console.log(query);
      this.connection.query(query, [table, data], (err, results) => {
        if (err) {
          reject(err);
        }
        this.connection.destroy();
        return resolve(results);
      });
    });
  }

  update(table, data, condition) {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    return new Promise((resolve, reject) => {
      let query = 'UPDATE ?? SET ?';
      if (condition) {
        query += ` WHERE ${condition} && exist = 1;`;
      }
      else {
        query += ';';
      }
      this.connection.query(query, [table, data], (err, results) => {
        if (results.affectedRows === 0 || results.changedRows === 0) {
          reject(new Error('Doesnt exist'));
        }
        if (err) {
          reject(err);
        }
        this.connection.destroy();
        return resolve(results);
      });
    });
  }

  physicalDel(table, condition) {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    return new Promise((resolve, reject) => {
      let query = 'DELETE FROM ??';
      if (condition) {
        query += ` WHERE ${condition};`;
      }
      else {
        query += ';';
      }
      this.connection.query(query, table, (err, results) => {
        if (err) {
          reject(err);
        }
        this.connection.destroy();
        resolve(results);
      });
    });
  }

  logicalDel(table, condition) {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    return new Promise((resolve, reject) => {
      let query = 'UPDATE ?? SET exist = 0';
      if (condition) {
        query += ` WHERE ${condition}`;
      }
      this.connection.query(query, table, (err, results) => {
        if (results.affectedRows === 0 || results.changedRows === 0) {
          reject(new Error('Doesnt exist'));
        }
        if (err) {
          reject(err);
        }
        this.connection.destroy();
        resolve(results);
      });
    });
  }
}

module.exports = new DB();
