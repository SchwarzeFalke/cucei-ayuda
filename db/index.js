/*const mysql = require('mysql');

class DB{
  constructor(){
    this.con = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    this.con.connect();
  }

  query(){
    this.con.query('SLECT 1+1 AS solution', (err,results) =>{

    });
  }
  get(table){
    this.con.query(`select * from ${table}`, (err,results) =>{
      return this.processResult(table,results);
    });
  }
  process(){

  }
}

module.exports = new DB();
*/
