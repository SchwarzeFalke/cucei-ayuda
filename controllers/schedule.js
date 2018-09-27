// controller for the schedule class

const db = require('../db');

class ScheduleCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.insert = this.insert.bind(this);
    this.del = this.del.bind(this);
  }

  getAll(req, res) {
    this.schedules = db.getAll('subjects');
    const json = {
      response: 'ok',
      data: this.schedules,

    };
    res.send(json);
  }

  get(req, res) {
    this.schedule = db.get('subjects', 'nrc', req.params.nrc);
    const json = {
      response: 'ok',
      data: this.schedule,

    };
    res.send(json);
  }

  insert(req, res) {
    const values = 'nrc, name, init_hour, end_hour, first_day, sec_day, classroom, section, credits, taught_by';
    const postdata = req.body;
    this.response = db.insert('subjects', values, postdata);
    const json = {
      response: this.respose,
    };
    res.send(json);
  }

  del(req, res) {
    this.schedule = db.del('subjects', 'nrc', req.params.nrc);
    const json = {
      response: 'Ok',
      data: this.schedule,
    };
    res.send(json);
}
  update(req, res) {
    this.schedule = db.update('subjects', req.body.arg1, req.body.arg2, req.body.arg3, req.body.arg4);
    const json = {
      response: 'Ok',
      data: this.schedule;
    };
    res.send(json);
  }
}

module.exports = new ScheduleCtrl();
