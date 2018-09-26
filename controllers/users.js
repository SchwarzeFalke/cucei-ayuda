/**
 * @Author: schwarze_falke
 * @Date:   2018-09-20T09:59:17-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-26T01:53:58-05:00
 */

const db = require('../db');

class UserCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.insert = this.insert.bind(this);
    this.del = this.del.bind(this);
  }

  async getAll(req, res) {
    this.data = db.getAll('users', '*').then((results) => {
      let json = {};
      if (this.data.length < 1) {
        json = {
          response: 'Error!',
          message: 'There is not elements in the database!',
        };
        res.status(400).send(json);
      } else {
        json = {
          response: 'Ok',
          data: results,
        };
        res.status(200).send(json);
      }
    });
  }

  get(req, res) {
    if (req.route.path === '/:userId/map') {
      this.data = db.get('users', 'stud_code', req.params.userId).then((results) => {
        const json = {
          response: 'Ok',
          data: results,
          total: 7,
        };
        res.send(json);
      });
    } else if (req.route.path === '/:userId/routes') {
      this.data = db.get('roads', 'id_stud', req.params.userId).then((results) => {
        const json = {
          response: 'Ok',
          data: results,
          total: 7,
        };
        res.send(json);
      });
    } else if (req.route.path === '/:userId/schedule') {
      this.data = db.get('schedule', 'stud_code', req.params.userId).then((results) => {
        const json = {
          response: 'Ok',
          data: results,
          total: 7,
        };
        res.send(json);
      });
    } else if (req.route.path === '/:userId/posts') {
      this.data = db.get('posts', 'user_id', req.params.userId).then((results) => {
        const json = {
          response: 'Ok',
          data: results,
          total: 7,
        };
        res.send(json);
      });
    }

    this.data = db.get('users', 'stud_code', req.params.userId).then((results) => {
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
    this.data = db.insert('users', values, postdata).then((results) => {
      const json = {
        response: results,
      };
      res.send(json);
    });
  }

  // update(req, res) {
  //
  // }

  del(req, res) {
    this.data = db.del('users', 'stud_code', req.params.userId).then((results) => {
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
