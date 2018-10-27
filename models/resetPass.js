/**
 * @ author: brandonmdiaz
 */
const UserMdl = require('./user');

class ResetPassword {
  constructor(args) {
    this.token = args.token;
    this.created_at = args.created_at;
    this.expires = args.expires;
    this.type = args.type;
    this.active = args.active;
    this.user_id = args.user_id;
  }

  static validEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  static async findUser(email) {
    this.user = await UserMdl.findUser(email);
    return this.user;
  }
}

module.exports = ResetPassword;
