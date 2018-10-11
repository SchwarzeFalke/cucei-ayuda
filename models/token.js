/**
 * @Author: schwarze_falke
 * @Date:   2018-10-11T09:26:08-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-11T10:21:28-05:00
 */


const db = require('../db'); // for database handling

class Token {
  constructor(args) {
    this.token = args.token;
    this.created_at = args.created_at;
    this.duration = args.duration;
    this.type = args.type;
    this.active = args.active;
    this.user_id = args.suser.id;
  }

  async get(token){
    let query = `token = ${token} && status = 1`;
    await db.get('tokens', '*', query)
    .then((results){
      this.result = results;
    })
    .cacht(e => console.error(`.catch(${e})`));
    return this.result;
  }

  async create() {
    await db.insert('token', this)
      .then(() => this.token)
      .catch(e => console.error(`.catch(${e})`));
  }

  async destroy(token) {
    await db.update('token', 'session(1)', `WHERE token = ${token}`)
      .then((result) => {
        if (result.affectedRows === 1) {
          this.response = 'Successfully ended session';
        } else { this.response = 'Cannot end session; token does not exist!'; }
        return this.response;
      });
  }
}

module.exports = Token;
