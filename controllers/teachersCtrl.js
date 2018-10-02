const { TeacherMdl } = require('../models');

class TeacherCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.modify = this.modify.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    await TeacherMdl.getAll(1)
      .then((data) => {
        this.requestJSON.data = data;
        res.status(this.requestJSON.status).send(this.requestJSON);
      })
      .catch(e => console.error(`.catch(${e}})`));
    // let data = await TeacherMdl.getAll();
    // if (data === undefined || data.length === 0) {
    //   res.status(404).send({
    //     error: 'you don´t have any data',
    //   });
    // } else {
    //   res.send(data);
    // }
  }

  async get(req, res) {
    console.log(req.params);
    this.teacherId = req.params.teacherId;
    const data = await TeacherMdl.find(this.teacherId);
    if (data === undefined || data.length === 0) {
      res.status(404).send({
        error: 'data not found',
      });
    } else {
      res.send(data);
    }
  }

  async create(req, res) {
    const teacher = new TeacherMdl(req.body);
    this.response = await teacher.save();
    if (this.response === 'bad reques') {
      res.status(400).send({
        error: 'bad reques',
      });
    } else if (this.response === 1) {
      res.status(200).send({ message: 'Registrado Correctamente' });
    } else {
      res.status(409).send({ error: 'No se pudo crear.' });
    }
  }

  async modify(req, res) {
    const teacher = new TeacherMdl(req.body);
    this.response = await teacher.modify(req.params.teacherId);
    res.status(200).send(this.response);
  }

  async delete(req, res) {
    const teacher = new TeacherMdl(req.body);
    this.deleted = await teacher.delete(req.params.teacherId);
    if (this.deleted === 1) {
      res.status(200).send({ message: 'Eliminado correctamente' });
    } else {
      res.status(400).send({ error: 'No se ha podido eliminar el elemento' });
    }
  }
}

module.exports = new TeacherCtrl();
