/**
 * @Author: schwarze_falke
 * @Date:   2018-10-09T07:49:32-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-11T02:46:50-05:00
 */
const db = require('../db'); // for database handling

class EmailMdl {
  constructor(args) {
    if (args.email !== undefined) this.email = args.email;
    if (args.user_code !== undefined) this.user_code = args.user_code;
  }

  static async get(id) {
    return new Promise(async (resolve, reject) => {
      this.emails = [];
      await db.get('email', '*', `WHERE user_code = ${id}`)
        .then((result) => {
          result.forEach((email) => {
            this.emails.push(email);
          });
        })
        .catch(e => reject(e));
      return resolve(this.emails);
    });
  }

  async insert(id, userEmail) {
    return new Promise(async (resolve, reject) => {
      this.information = {
        user_code: id,
        email: userEmail,
      };
      await db.insert('email', this.information)
        .then((result) => {
          this.reponse = {
            dataCreated: this.information,
            info: result,
          };
          return resolve(this.response);
        })
        .catch(e => reject(e));
    });
  }
}

module.exports = EmailMdl;
