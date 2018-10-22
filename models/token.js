/**
 * @Author: Carlos Vara
 * @Date:   2018-10-11T09:26:08-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-22T01:12:10-05:00
 */


const db = require('../db'); // for database handling

class Token {
  constructor(args) {
    this.token = args.token;
    this.created_at = args.created_at;
    this.expires = args.expires;
    this.type = args.type;
    this.active = args.active;
    this.user_id = args.user_id;
  }

  static async get(token) {
    const query = `token = '${token}'`;
    await db.get('token', '*', query)
      .then((results) => {
        this.result = results;
      })
      .catch(e => console.error(`.catch(${e})`));
    return this.result;
  }

  static async sessionTimeOut(token) {
    const query = `token = ${token}`;
    await db.get('token', 'expires', query)
      .then((result) => {
        this.session = 'VALID';
        if (result.expires < new Date()) {
          Token.destroy(token);
          this.session = 'EXPIRED';
        }
        return this.session;
      })
      .catch(e => console.error(`.catch(${e})`));
  }

  static async active(args) {
    return new Promise(async (resolve, reject) => {
      let query;
      if (args.user) {
        query = `user_id = ${args.user}`;
      } else if (args.token) {
        query = `token = ${args.token}`;
      }
      await db.get('token', '*', query)
        .then((results) => {
          if (results.length > 1) {
            resolve('ACTIVE');
          }
          resolve('NON-ACTIVE');
        })
        .catch(e => reject(e));
    });
  }

  static async create(data) {
    return new Promise(async (resolve, reject) => {
      await db.insert('token', data)
        .then(() => {
          resolve(data.token);
        })
        .catch(e => reject(e));
    });
  }

  async destroy(token) {
    await db.update('token', 'exist(0)', `WHERE token = ${token}`)
      .then((result) => {
        if (result.affectedRows === 1) {
          this.response = 'Successfully ended session';
        } else { this.response = 'Cannot end session; token does not exist!'; }
        return this.response;
      });
  }
}

module.exports = Token;
