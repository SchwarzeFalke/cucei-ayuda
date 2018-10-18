/**
 * @Author: Carlos Vara
 * @Date:   2018-10-11T09:26:08-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-16T13:16:15-05:00
 */


const db = require('../db'); // for database handling

class Token {
  constructor(args) {
    this.token = args.token;
    this.created_at = args.created_at;
    this.expires = new Date(args.created_at.getTime() + args.duration * 60000);
    this.type = args.type;
    this.active = args.active;
    this.user_id = args.suser.id;
  }

  async get(token) {
    const query = `token = ${token}`;
    await db.get('tokens', '*', query)
      .then((results) => {
        this.result = results;
      })
      .cacht(e => console.error(`.catch(${e})`));
    return this.result;
  }

  async sessionTimeOut(token) {
    const query = `token = ${token}`;
    await db.get('tokens', 'expires', query)
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

  async active(args) {
    let query;
    if (args.user) {
      query = `user_id = ${args.user}`;
    } else if (args.token) {
      query = `token = ${args.token}`;
    }
    await db.get('tokens', '*', query)
      .then((results) => {
        Token.sessionTimeOut(results.token);
        if (results.exist) {
          this.result = 'ACTIVE';
        } else {
          this.result = 'NON-ACTIVE';
        }
      })
      .catch(e => console.error(`.catch(${e})`));
    return this.result;
  }

  async create() {
    await db.insert('token', this)
      .then(() => this.token)
      .catch(e => console.error(`.catch(${e})`));
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
