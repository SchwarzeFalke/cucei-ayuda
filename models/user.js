/**
 * @Author: schwarze_falke
 * @Date:   2018-09-21T19:39:23-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-21T19:56:25-05:00
 */

const db = require('../db');

class User {
  constructor(...args) {
    this.stud_code = args.stud_code;
    this.name = args.name;
    this.middle_name = args.middle_name;
    this.flastname = args.flastname;
    this.mlastname = args.mlastname;
    this.email = args.email;
    this.password = args.password;
  }

  save() {
    db.create(this);
  }
}

module.exports = User;
