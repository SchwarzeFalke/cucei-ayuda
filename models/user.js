/**
 * @Author: schwarze_falke
 * @Date:   2018-09-21T19:39:23-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-27T00:13:18-05:00
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
  }

  processResult(data) {
    this.result = [];
    data.forEach((res) => {
      this.result.push(new UserMdl(res));
    });
    return this.result;
  }

  getFullName(order) {
    let name = '';
    switch (order) {
      case 1:
        name += this.flastname + this.mlastname + this.name + this.middle_name;
        break;
      case 2:
        name += this.flastname + this.mlastname;
        break;
      case 3:
        name += this.name + this.flastname;
        break;
      case 4:
        name += this.name;
        break;
      default:
        name += this.name + this.middle_name + this.flastname + this.mlastname;
    }
    return name;
  }

  getStudCode() { return this.stud_code; }

  getEmail() { return this.email; }
}
module.exports = UserMdl;
