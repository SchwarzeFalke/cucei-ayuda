/**
 * @Author: schwarze_falke
 * @Date:   2018-09-20T09:59:17-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-23T23:52:08-05:00
 */

const db = require('../db');

class UserCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.insert = this.insert.bind(this);
    this.del = this.del.bind(this);
  }

  getAll(req, res) {
    this.users = db.getAll('users');
    const json = {
      response: 'Ok',
      data: this.users,
      total: 7,
    };
    res.send(json);
  }

  get(req, res) {
    this.user = db.get('users', 'stud_code', req.params.userId);
    const json = {
      response: 'Ok',
      data: this.user,
      total: 7,
    };
    res.send(json);
    console.log(req.route.path);
  }

  insert(req, res) {
    const values = 'stud_code, name, middle_name, flastname, mlastname, email, password';
    const postdata = req.body;
    this.response = db.insert('users', values, postdata);
    const json = {
      response: this.response,
    };
    res.send(json);
  }

  del(req, res) {
    this.user = db.del('users', 'stud_code', req.params.userId);
    const json = {
      response: 'Ok',
      data: this.user,
      total: 7,
    };
    res.send(json);
  }
}

module.exports = new UserCtrl();