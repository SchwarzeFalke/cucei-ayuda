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

   get(table, columns, condition) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT ?? FROM ?? WHERE exist = TRUE';
      const data = [columns, table];
      if (condition.length > 1) {
        query += ` && ${condition};`;
      } else { query += ';'; }

        this.connection.query(query, data, (err, results) => {
          if (err) throw reject(err);
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
        if (err) return reject(err);
        return resolve(results);
      });
    });
  }

   update(table, data, condition) {
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

   del(table, condition) {
    return new Promise((resolve, reject) => {
      let query = 'DELETE FROM ??';
      if (condition) {
        query += `WHERE ${condition};`;
      } else { query += ';'; }
      console.log(query);
      this.connection.query(query, table, (err, results) => {
        if (err) throw reject(err);
        resolve(results);
      });
    });
  }

  logDel(table, data, condition) {
   return new Promise((resolve, reject) => {
     let query = 'UPDATE ?? SET exist = 0';
     if (condition) {
       query += `WHERE ${condition};`;
     } else { query += ';'; }
     this.connection.query(query, [table, data], (err, results) => {
       if (err) return reject(err);
       return resolve(results);
     });
   });
 }

}
 module.exports = new DB();
