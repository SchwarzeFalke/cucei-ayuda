/**
 * @Author: schwarze_falke
 * @Date:   2018-09-20T09:59:17-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-27T02:38:11-05:00
 */

const db = require('../db');
const { UserMdl } = require('../models');

class UserCtrl {
  constructor() {
    // Binding class methods of the controller
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.insert = this.insert.bind(this);
    this.del = this.del.bind(this);

    /**
     * [createdJSON description]
     * @type {Object} Defines a format to give a success response at requesting
     * a new user. Its 'data' field does not return nothing.
     */
    this.createdJSON = {
      status: 201,
      response: 'Created',
      message: 'New user successfully created',
      description: 'A new user has been created successfully into database. '
      + 'Please, update your profile information.',
      data: null,
    };

    /**
     * [requestJSON description]
     * @type {Object} Defines a format to give a success response at requesting
     * all data from database (user table). Its 'data' field returns all the
     * information from the 'user' table.
     */
    this.requestJSON = {
      status: 200,
      response: 'Ok',
      message: 'Display request information',
      description: 'These are all the users (students) from the database API. '
      + 'Paging of the data is in progress.',
      data: null,
    };

    /**
     * [forbiddenJSON description]
     * @type {Object} Defines a format to give a bad response at requesting a
     * new user. This response it's only given when user cannot be created
     * because of a repeated row (duplicated primary key).
     */
    this.forbiddenJSON = {
      status: 403,
      response: 'Forbidden',
      message: 'Cannot create user',
      description: 'The user creation request cannot proceed because of a '
      + 'duplicated value. Please provide correct information',
      data: null,
    };
  }

  /**
   * getAll: Returns all the data from database via db class
   * @param  {[type]} req
   * @param  {[type]} res
   * @return {[type]}     not-formatted rows (pending)
   */
  getAll(req, res) {
    try {
      db.get('user', '*') // asteriks reffers to ALL columns
        .then((results) => {
          this.requestJSON.data = results; // data field is set
          res.status(this.requestJSON.status).send(this.requestJSON);
        })
        .catch(e => console.error(`.catch(${e})`));
    } catch (e) {
      console.error(`try/catch(${e})`);
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
  }

  getRoads(req, res) {
    try {
      const condition = `stud_code = ${req.params.userId}`;
      db.get('road', '*', condition)
        .then((results) => {
          this.requestJSON.data = results;
          res.status(this.requestJSON.status).send(this.requestJSON);
        })
        .catch(e => console.error(`.catch(${e})`));
    } catch (e) {
      console.error(`try/catch(${e})`);
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
  }

  getSchedule(req, res) {
    try {
      const condition = `stud_code = ${req.params.userId}`;
      db.get('schedule', '*', condition)
        .then((results) => {
          this.requestJSON.data = results;
          res.status(this.requestJSON.status).send(this.requestJSON);
        })
        .catch(e => console.error(`.catch(${e})`));
    } catch (e) {
      console.error(`try/catch(${e})`);
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
  }

  getPosts(req, res) {
    try {
      const condition = `stud_code = ${req.params.userId}`;
      db.get('maps', '*', condition)
        .then((results) => {
          this.requestJSON.data = results;
          res.status(this.requestJSON.status).send(this.requestJSON);
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
