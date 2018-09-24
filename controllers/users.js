/**
 * @Author: schwarze_falke
 * @Date:   2018-09-20T09:59:17-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-24T00:36:29-05:00
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
    db.getAll('users').then(results => {
      const json = {
        response: 'Ok',
        data: results,
        total: 7,
      };
      res.send(json);
    });
  }

  get(req, res) {
    db.get('users', 'stud_code', req.params.userId).then(results => {
      const json = {
        response: 'Ok',
        data: results,
        total: 7,
      };
      res.send(json);
    });
  }

  insert(req, res) {
    const values = 'stud_code, name, middle_name, flastname, mlastname, email, password';
    const postdata = req.body;
    db.insert('users', values, postdata).then(results => {
      const json = {
        response: results,
      };
      res.send(json);
    });
  }

  del(req, res) {
    db.del('users', 'stud_code', req.params.userId).then(results => {
      const json = {
        response: 'Ok',
        data: results,
        total: 7,
      };
      res.send(json);
    });
  }
}

module.exports = new UserCtrl();