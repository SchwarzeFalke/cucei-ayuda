/**
 * @Author: schwarze_falke
 * @Date:   2018-09-21T19:39:23-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-26T21:56:04-05:00
 */

const db = require('../db');

class UserMdl {
  constructor(args) {
    this.stud_code = args.stud_code;
    this.name = args.name;
    this.middle_name = args.middle_name;
    this.flastname = args.flastname;
    this.mlastname = args.mlastname;
    this.email = args.email;
    this.password = args.password;
  }

  async processResult(data) {
    this.result = [];
    data.forEach((res) => {
      this.result.push(new UserMdl(res));
    });
    return this.result;
  }

  async save() {
    await db.insert('users', this).then((results) => {
      this.result = results;
    });
    return 0;
  }
}
module.exports = UserMdl;
