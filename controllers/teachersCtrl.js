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
    this.data = thread.all().then((results) => {
      const json = {
        response: 'Ok',
        data: results,
      };
      res.send(json);
    });
  }

  get(res, req) {}
}

module.exports = new TeachersCtrl();
