/**
 * @Author: schwarze_falke
 * @Date:   2018-09-20T09:59:17-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-27T00:15:30-05:00
 */

const db = require('../db');
const { UserMdl } = require('../models');

class UserCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.insert = this.insert.bind(this);
    this.del = this.del.bind(this);

    this.createdJSON = {
      status: 201,
      response: 'Created',
      message: 'New user successfully created',
      data: null,
    };

    this.forbiddenJSON = {
      status: 403,
      response: 'Forbidden',
      message: 'Cannot create user',
      data: null,
    };
  }

  getAll(req, res) {
    try {
      this.state = db.get('users', '*')
        .then((results) => {
          this.createdJSON.data = results;
          res.status(this.createdJSON.status).send(this.createdJSON);
        })
        .catch(e => console.error(`.catch(${e})`));
    } catch (e) {
      console.error(`try/catch(${e})`);
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
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
    const user = new UserMdl({ ...req.body });
    let json = {};

    this.result = user.save();

    if (this.result === 0) {
      json = {
        status: 'Ok',
        message: 'Successfully created!',
      };
      res.status(201).send(json);
    } else if (this.result === 1) {
      json = {
        status: 'Error!',
        message: 'Cannot create user!',
      };
      res.status(400).send(json);
    }
  }

  async del(req, res) {
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
