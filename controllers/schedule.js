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
    this.schedules = db.getAll('schedules');
    const json = {
      response: 'ok',
      data: this.schedules,

    };
    res.send(json);
  }

  get(req, res) {
    this.schedule = db.get('schedules', 'Id', req.params.scheduleId);
    const json = {
      response: 'ok',
      data: this.schedule,

    };
    res.send(json);
  }

  insert(req, res) {
    const values = 'schedule_id, clave, materia, sec, cr, hora, dias, edif, aula, profesor';
    const postdata = req.body;
    this.response = db.insert('schedules', values, postdata);
    const json = {
      response: this.respose,
    };
    res.send(json);
  }

  del(req, res) {
    this.schedule = db.del('schedules', 'schedule_id', req.params.scheduleId);
    const json = {
      response: 'Ok',
      data: this.user,
    };


}
}

module.exports = new ScheduleCtrl();
