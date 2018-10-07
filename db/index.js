
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

  get(table, columns, condition, order) {
    return new Promise((resolve, reject) => {
      const data = [columns, table];
      let query = 'SELECT ?? FROM ??'; // avoid logical deleted data
      query += ' WHERE exist = TRUE';

      if (condition.length > 1) query += ` && ${condition}`;
      if (order) query += order;
      query += ';';
      console.log(query);
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
          // console.log('Error en catch databasebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
          reject(err);
        }
        return resolve(results);
      });
    });
  }

  update(table, data, condition) {
    return new Promise((resolve, reject) => {
      let query = 'UPDATE ?? SET ?';
      if (condition) {
        query += ` WHERE ${condition};`;
      } else { query += ';'; }
      this.connection.query(query, [table, data], (err, results) => {
        if (err) reject(err);
        return resolve(results);
      });
    });
  }

  del(table, condition) {
    return new Promise((resolve, reject) => {
      let query = 'DELETE FROM ??';
      if (condition) {
        query += ` WHERE ${condition};`;
      } else { query += ';'; }
      console.log(query);
      this.connection.query(query, table, (err, results) => {
        if (err) reject(err);
        return resolve(results);
      });
    });
  }
}
module.exports = new DB();
