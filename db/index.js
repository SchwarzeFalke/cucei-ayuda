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

  getAll() {
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
