/**
 * @Author: schwarze_falke
 * @Date:   2018-10-07T13:20:58-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-07T22:39:55-05:00
 */

// controller for the Subject class

const { Subject } = require('../models');

class SubjectCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.getSubject = this.getSubject.bind(this);
    this.del = this.del.bind(this);
    this.update = this.update.bind(this);

    this.modifyJSON = {
      status: 201,
      response: null,
      message: 'Subject modified',
      data: null,
    };

    this.requestJSON = {
      status: 200,
      response: 'Ok',
      message: null,
      data: null,
    };

    this.forbiddenJSON = {
      status: 403,
      response: 'Forbidden',
      message: null,
      data: null,
    };
  }

  async getAll(req, res) {
    try {
      await Subject.getAll()
        .then((data) => {
          this.requestJSON.data = data;
          res.status(this.requestJSON.status).send(this.requestJSON);
        })
        .catch((e) => {
          console.error(`.catch(${e})`);
          res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
        });
    } catch (e) {
      console.error(`try/catch(${e})`);
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
  }

  async getSubject(req, res) {
    try {
      await Subject.validSubject(req.params.nrc)
        .then((exists) => {
          if (exists) {
            const condition = `nrc = ${req.params.nrc}`;
            Subject.get('*', condition)
              .then((data) => {
                this.requestJSON.data = data;
                res.status(this.requestJSON.status).send(this.requestJSON);
              })
              .catch((e) => {
                console.error(`.catch(${e})`);
                res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
              });
          } else {
            this.forbiddenJSON.message = 'The requested subject cannot be found';
            res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
          }
        })
        .catch((e) => {
          console.error(`.catch(${e})`);
          res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
        });
    } catch (e) {
      console.error(`try/catch(${e})`);
      this.forbiddenJSON.message = 'Oops! Something unexpected happened.';
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
  }

  async insert(req, res) {
    console.log(req.body);
    const newSubject = new Subject({ ...req.body });
    try {
      await newSubject.save()
        .then((data) => {
          this.info = data;
          this.modifyJSON.response = 'Created';
          this.modifyJSON.message += ' created into database';
          this.modifyJSON.data = newSubject;
          res.status(this.modifyJSON.status).send(this.modifyJSON);
        })
        .catch((e) => {
          console.error(`.catch(${e})`);
          res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
        });
    } catch (e) {
      console.error(`try/catch(${e})`);
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
  }

  async del(req, res) {
    try {
      const condition = `nrc = ${req.params.nrc}`;
      await Subject.del(condition)
        .then((data) => {
          this.modifyJSON.data = data;
          this.modifyJSON.response = 'Deleted';
          this.modifyJSON.message += ' deleted from database';
          res.status(this.modifyJSON.status).send(this.modifyJSON);
        })
        .catch((e) => {
          console.error(`.catch(${e})`);
          res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
        });
    } catch (e) {
      console.error(`try/catch(${e})`);
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
  }

  async update(req, res) {
    const updateSubject = new Subject({ ...req.body });
    try {
      await updateSubject.update(req.params.nrc)
        .then((data) => {
          this.modifyJSON.response = 'Updated';
          this.modifyJSON.message += ' updated from database';
          this.modifyJSON.data = data;
          res.status(this.modifyJSON.status).send(this.modifyJSON);
        })
        .catch((e) => {
          console.error(`.catch(${e})`);
          res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
        });
    } catch (e) {
      console.error(`try/catch(${e})`);
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
    }
  }
}

module.exports = new SubjectCtrl();
