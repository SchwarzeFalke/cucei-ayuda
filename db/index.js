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

  getAll(table, cb) {
    this.con.query(`SELECT * FROM ${table}`, (err, results) => {
      if (err) cb(err, null);
      cb(null, results);
    });
  }

  get(table, arg1, arg2) {
    this.connection.query(`SELECT * FROM ${table} WHERE ${arg1} = ${arg2}`,
      (err, results) => {
        if (err) throw err;
        this.result = results;
      });
    return this.result;
  }

  insert(table, data) {
    const sql = 'INSERT INTO '.concat(`${table}`);
    const sql2 = `${sql} SET ?`;
    this.connection.query(sql2, data, (err, results) => {
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


// INSERT INTO users (stud_code,name,middle_name,flastname,mlastname,email,password) VALUES
// (1111,'brandon', 'manuel','diaz','flores','brandon@gmail.com','1234');
//
// INSERT INTO topics(name) VALUES ('Noticias');
//
// INSERT INTO threads (subject,created,user_id,topic_id) VALUES
//  ('como se hace la tarea?',NULL, 1111, 1);
