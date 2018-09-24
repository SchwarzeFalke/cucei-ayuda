const thread = require('../models');

class TeachersCtrl {
  constructor() {
    this.getAll.bind(this);
    this.get.bind(this);
    this.create.bind(this);
    this.modify.bind(this);
    this.delete.bind(this);
  }

  getAll(req, res) {
    this.teachers = thread.All('teachers');
    const json = {
      data: this.teachers,
      total_count: this.teachers.lenght,
    }
    res.send(json);
  }

  get(res, req) {
    this.teacher = db.get('teachers', 'id', res.params.id);

  }
}
