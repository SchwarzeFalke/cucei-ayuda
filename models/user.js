/**
 * @Author: schwarze_falke
 * @Date:   2018-09-21T19:39:23-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-27T03:04:17-05:00
 */
const db = require('../db');
/**
 * User Model class
 */
class UserMdl {
  constructor(args) {
    this.stud_code = args.stud_code;
    this.name = args.name;
    this.middle_name = args.middle_name;
    this.flastname = args.flastname;
    this.mlastname = args.mlastname;
    this.email = args.email;
    this.password = args.password;
    this.exist = args.exist;
  }

  processResult(data) {
    this.result = [];
    data.forEach((res) => {
      this.result.push(new UserMdl(res));
    });
    return this.result;
  }

  save() {
    db.insert('user', this);
  }
  /**
   * Returns the user name formatted in a specific way
   * @param  {[type]} order param for set the name format
   * @return {[type]}       [description]
   */
  getFullName(order) {
    let name = '';
    switch (order) {
      case 1: // first lastnames, then names
        name += this.flastname + this.mlastname + this.name + this.middle_name;
        break;
      case 2: // first father's lastname, then first name
        name += this.flastname + this.mlastname;
        break;
      case 3: // first first name, then father's lastname
        name += this.name + this.flastname;
        break;
      case 4: // only returns first name
        name += this.name;
        break;
      default: // full name starting with the first name
        name += this.name + this.middle_name + this.flastname + this.mlastname;
    }
    return name;
  }

  /**
   * [getStudCode description]
   * @return {[type]} returns the user's identifier (primary key)
   */
  getStudCode() { return this.stud_code; }

  /**
   * [getEmail description]
   * @return {[type]} returns the user's email
   */
  getEmail() { return this.email; }
}
module.exports = UserMdl;
