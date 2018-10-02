// controller for the schedule class

const { Schedule } = require('../models');

class ScheduleCtrl {

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
      await Schedule.getAll()
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
      await Schedule.validSchedule(req.params.nrc)
        .then((exists) => {
          if (exists) {
            const condition = `nrc = ${req.params.nrc}`;
            Schedule.get('*', condition)
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
    const newSchedule = new Schedule({ ...req.body });
    try {
      await newSchedule.save()
        .then((data) => {
          this.info = data;
          this.modifyJSON.response = 'Created';
          this.modifyJSON.message += ' created into database';
          this.modifyJSON.data = newSchedule;
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
      await Schedule.del(condition)
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
    const updateSchedule = new Schedule({ ...req.body });
    try {
      await updateSchedule.update(req.params.nrc)
        .then((data) => {
          this.modifyJSON.response = 'Updated';
          this.modifyJSON.message += ' updated from database';
          this.createdJSON.data = data;
          res.status(this.createdJSON.status).send(this.createdJSON);
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

module.exports = new ScheduleCtrl();
