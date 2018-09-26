/**
 * @Author: schwarze_falke
 * @Date:   2018-09-21T19:39:23-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-26T02:12:25-05:00
 */

const db = require('../db');

class User {
  constructor(args) {
    this.stud_code = args.stud_code;
    this.photo = args.photo;
    this.name = args.name;
  }

  processResult(data) {
    this.result = [];
    data.forEach((res) => {
      this.result.push(new User(res));
    });
    return this.result;
  }

  async save() {
    Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
    if (this.stud_code !== undefined && this.processResult(await
    db.get('users', 'stud_code', [{
      attr: 'id',
      oper: '=',
      val: this.stud_code,
    }])).length !== 0) return this.update();
    return 1;
  }
}

module.exports = User;
