/**
 * @Author: schwarze_falke
 * @Date:   2018-09-20T09:59:17-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-30T02:39:05-05:00
 */

const { UserMdl } = require('../models');

class UserCtrl {
  constructor() {
    // Binding class methods of the controller
    this.getAll = this.getAll.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getRoads = this.getRoads.bind(this);
    this.getSchedule = this.getSchedule.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.insert = this.insert.bind(this);
    this.del = this.del.bind(this);

    /**
     * [createdJSON description]
     * @type {Object} Defines a format to give a success response at requesting
     * a new user. Its 'data' field does not return nothing.
     */
    this.modifyJSON = {
      status: 201,
      response: null,
      message: 'User successfully',
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
      message: null,
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
      message: null,
      data: null,
    };
  }

  /**
   * getAll: Returns all the data from database via db class
   * @param  {[type]} req
   * @param  {[type]} res
   * @return {[type]}     not-formatted rows (pending)
   */

  async getAll(req, res) {
    try {
      await UserMdl.getAll()
        .then((data) => {
          this.requestJSON.data = data; // data field is set
          res.status(this.requestJSON.status).send(this.requestJSON);
        })
        .catch(e => console.error(`.catch(${e}})`));
    } catch (e) {
      console.error(`try/catch(${e})`);
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
  }

  async getUser(req, res) {
    try {
      const condition = `stud_code = ${req.params.userId}`;
      await UserMdl.get('*', condition)
        .then((data) => {
          this.requestJSON.data = data;
          res.status(this.requestJSON.status).send(this.requestJSON);
        })
        .catch(e => console.error(`.catch(${e})`));
    } catch (e) {
      console.error(`try/catch(${e})`);
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
  }

  async getRoads(req, res) {
    try {
      const condition = `stud_code = ${req.params.userId}`;
      await UserMdl.get('*', condition)
        .then((data) => {
          console.log(data);
          this.requestJSON.data = data;
          res.status(this.requestJSON.status).send(this.requestJSON);
        })
        .catch(e => console.error(`.catch(${e})`));
    } catch (e) {
      console.error(`try/catch(${e})`);
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
  }

  async getSchedule(req, res) {
    try {
      const condition = `stud_code = ${req.params.userId}`;
      await UserMdl.get('*', condition)
        .then((data) => {
          this.requestJSON.data = data;
          res.status(this.requestJSON.status).send(this.requestJSON);
        })
        .catch(e => console.error(`.catch(${e})`));
    } catch (e) {
      console.error(`try/catch(${e})`);
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
  }

  async getPosts(req, res) {
    try {
      const condition = `stud_code = ${req.params.userId}`;
      await UserMdl.get('*', condition)
        .then((data) => {
          this.requestJSON.data = data;
          res.status(this.requestJSON.status).send(this.requestJSON);
        })
        .catch(e => console.error(`.catch(${e})`));
    } catch (e) {
      console.error(`try/catch(${e})`);
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
  }

  async insert(req, res) {
    const newUser = new UserMdl({ ...req.body });
    try {
      await newUser.save()
        .then((data) => {
          this.info = data;
          this.modifyJSON.response = 'Created';
          this.modifyJSON.message += ' created into database';
          this.modifyJSON.data = newUser;
          res.status(this.modifyJSON.status).send(this.modifyJSON);
        })
        .catch(e => console.error(`.catch(${e})`));
    } catch (e) {
      console.error(`try/catch(${e})`);
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
  }

  async del(req, res) {
    try {
      const condition = `stud_code = ${req.params.userId}`;
      await UserMdl.del(condition)
        .then((data) => {
          this.modifyJSON.data = data;
          this.modifyJSON.response = 'Deleted';
          this.modifyJSON.message += ' deleted from database';
          res.status(this.modifyJSON.status).send(this.modifyJSON);
        })
        .catch(e => console.error(`.catch(${e})`));
    } catch (e) {
      console.error(`try/catch(${e})`);
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
  }

  async update(req, res) {
    const updateUser = new UserMdl({ ...req.body });
    try {
      await updateUser.update(req.params.userId)
        .then((data) => {
          this.modifyJSON.response = 'Updated';
          this.modifyJSON.message += ' updated from database';
          this.createdJSON.data = data;
          res.status(this.createdJSON.status).send(this.createdJSON);
        })
        .catch(e => console.error(`.catch(${e})`));
    } catch (e) {
      console.error(`try/catch(${e})`);
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
  }
}

module.exports = new UserCtrl();
