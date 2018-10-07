/**
 * @Author: schwarze_falke
 * @Date:   2018-09-20T09:59:17-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-07T12:54:24-05:00
 */

const { UserMdl } = require('../models'); // for model handling

/**
 * Name: user.js | Type: Class | Description: User Controller | @Author: Carlos Vara
 *                                 METHODS
 * constructor()  ->  Defines the JSON responses & method bindings
 * -----------------------------------------------------------------------------
 * Getters:
 * ---> getAll(req, res)        ->  Returns a full name
 * ---> getUser(req, res)       ->  Returns a student code
 * ---> getRoads(req, res)      ->  Return an email
 * ---> getSchedule(req, res)   ->  Returns an user ID validation
 * ---> getPosts(req, res)      ->
 * -----------------------------------------------------------------------------
 * Data Handling:
 * ---> insert(req, res)        ->  Returns all database users
 * ---> del(req, res)           ->  Deletes by a condition
 * ---> save(req, res)          ->  Saves the object into database
 * ---> update(req, res)        ->  Updates the requested user
 * -----------------------------------------------------------------------------
 */

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
      message: null,
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
   * getAll: Returns all the data from database via user model
   * @param  {[type]} req
   * @param  {[type]} res
   * @return {[type]}     not-formatted rows (pending)
   */
  async getAll(req, res) {
    try {
      await UserMdl.getAll(req.query)
        .then((data) => {
          this.requestJSON.message = 'All database users';
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
      await UserMdl.validUser(req.params.userId)
        .then((exists) => {
          if (exists) {
            UserMdl.get('*', req.params.userId, req.query)
              .then((data) => {
                this.requestJSON.data = data;
                res.status(this.requestJSON.status).send(this.requestJSON);
              })
              .catch(e => console.error(`.catch(${e})`));
          } else {
            this.forbiddenJSON.message = 'The requested user cannot be found';
            res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
          }
        })
        .catch(e => console.error(`.catch(${e})`));
    } catch (e) {
      console.error(`try/catch(${e})`);
      this.forbiddenJSON.message = 'Oops! Something unexpected happened.';
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
  }

  async getRoads(req, res) {
    try {
      await UserMdl.validUser(req.params.userId)
        .then((exists) => {
          if (exists) {
            UserMdl.get('*', req.params.userId, req.query)
              .then((data) => {
                this.requestJSON.data = data;
                res.status(this.requestJSON.status).send(this.requestJSON);
              })
              .catch(e => console.error(`.catch(${e})`));
          } else {
            this.forbiddenJSON.message = 'The requested user cannot be found';
            res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
          }
        })
        .catch(e => console.error(`.catch(${e})`));
    } catch (e) {
      console.error(`try/catch(${e})`);
      this.forbiddenJSON.message = 'Oops! Something unexpected happened.';
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
  }

  async getSchedule(req, res) {
    try {
      if (await UserMdl.validUser(req.params.userId)) {
        const condition = `user_code = ${req.params.userId}`;
        await UserMdl.get('*', condition)
          .then((data) => {
            this.requestJSON.data = data;
            res.status(this.requestJSON.status).send(this.requestJSON);
          })
          .catch(e => console.error(`.catch(${e})`));
      } else {
        this.forbiddenJSON.message = 'The requested user cannot be found';
        res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
      }
    } catch (e) {
      console.error(`try/catch(${e})`);
      this.forbiddenJSON.message = 'Oops! Something unexpected happened.';
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
  }

  async getPosts(req, res) {
    try {
      const condition = `user_code = ${req.params.userId}`;
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
          this.modifyJSON.message = 'User successfully created into database';
          this.modifyJSON.data = newUser;
          res.status(this.modifyJSON.status).send(this.modifyJSON);
        })
        .catch(e => console.error(`.catch(${e})`));
    } catch (e) {
      console.error(`try/catch(${e})`);
      this.forbiddenJSON.data = e;
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
  }

  async del(req, res) {
    try {
      await UserMdl.del(req.params.userId, req.query)
        .then((data) => {
          this.modifyJSON.data = data;
          this.modifyJSON.response = 'Deleted';
          this.modifyJSON.message += 'User successfully deleted from database';
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
      await updateUser.update()
        .then((data) => {
          this.info = data;
          this.modifyJSON.response = 'Updated';
          this.modifyJSON.message = 'User successfully updated from database';
          this.modifyJSON.data = updateUser;
          res.status(this.modifyJSON.status).send(this.modifyJSON);
        })
        .catch(e => console.error(`.catch(${e})`));
    } catch (e) {
      console.error(`try/catch(${e})`);
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
  }
}

module.exports = new UserCtrl();
