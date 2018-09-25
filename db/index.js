const mysql = require('mysql');

class DB {
  constructor() {
    this.con = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    this.con.connect();
  }

  getAll(table) {
    return new Promise((resolve, reject) => {
      this.con.query(`SELECT * FROM ${table}`, (err, results) => {
        if (err) throw reject(err);
        resolve(results);
      });
    });
  }

  get(table, arg1, arg2) {
    return new Promise((resolve, reject) => {
      this.con.query(`SELECT * FROM ${table} WHERE ${arg1} = ${arg2}`,
        (err, results) => {
          if (err) throw reject(err);
          resolve(results);
        });
    });
  }

  insert(table, data) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO '.concat(`${table}`);
      const sql2 = `${sql} SET ?`;
      console.log(data);
      this.con.query(sql2, data, (err, results) => {
        if (err) {
          console.log(err);
          throw reject(err);
        }
        resolve(results);
      });
    });
  }

  del(table, arg1, arg2) {
    return new Promise((resolve, reject) => {
      this.con.query(`DELETE FROM ${table} WHERE ${arg1} = ${arg2}`,
        (err, results) => {
          if (err) throw reject(err);
          resolve(results);
        });
    });
  }
}

module.exports = new DB();
// INSERT INTO users (stud_code,name,middle_name,flastname,mlastname,email,password) VALUES
// (1111,'brandon', 'manuel','diaz','flores','brandon@gmail.com','1234');
//
// INSERT INTO topics(name) VALUES ('Noticias');
//
// INSERT INTO threads (subject,created,user_id,topic_id) VALUES
//  ('como se hace la tarea?',NULL, 1111, 1);
