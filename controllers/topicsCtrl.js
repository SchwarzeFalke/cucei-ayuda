const { TopicMdl } = require('../models');

class TopicCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.modify = this.modify.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    const query = req.query;
    //  GET ALL
    if (Object.keys(query).length === 0 && query.constructor === Object) {
      await TopicMdl.getAll().then((result) => {
        this.data = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        res.status(400).send({ error: 'Something went wrong! Monkeys working on it' });
      });
      if (this.data === undefined || this.data.length === 0) {
        res.status(404).send({
          error: 'you don´t have any data',
        });
      } else {
        res.send(this.data);
      }
      //  GET query data
    } else {
      await TopicMdl.find(query).then((result) => {
        this.data = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        res.status(404).send({
          error: 'No se encontró el dato',
        });
      });
      if (this.data === undefined || this.data.length === 0) {
        res.status(404).send({
          error: 'No se encontró el dato',
        });
      } else {
        res.send(this.data);
      }
    }
  }

  async get(req, res) {
    const { topicId } = req.params;
    try {
      await TopicMdl.find(topicId).then((result) => {
        this.data = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        res.status(404).send({
          error: 'data not found',
        });
      });
    } catch (e) {
      console.error(`error!! ${e}`);
      res.status(400).send({ message: 'Something went wrong! Monkeys working on it' });
    }
    if (this.data === undefined || this.data.length === 0) {
      res.status(404).send({
        error: 'data not found',
      });
    } else {
      res.send(this.data);
    }
  }

  async create(req, res) {
    const topic = new TopicMdl(req.body);
    await topic.save().then((result) => {
      this.response = result;
    }).catch((e) => {
      console.error(`error!! ${e}`);
      res.status(400).send({ message: 'Something went wrong! Monkeys working on it' });
    });
    if (this.response === undefined) {
      res.status(400).send({ message: 'Something went wrong! Monkeys working on it' });
    }
    if (this.response === 1) {
      res.status(400).send({ message: 'Not enough data' });
    }
    const id = this.response.insertId;
    if (id > 0) {
      res.status(200).send({ message: 'Registrado Correctamente' });
    } else {
      res.status(400).send({
        error: 'Something went wrong, data not saved',
      });
    }
  }

  async modify(req, res) {
    const topic = new TopicMdl(req.body);
    try {
      await topic.modify(req.params.topicId).then((result) => {
        this.topicModify = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        res.status(400).send({ error: 'todo mal' });
      });
    } catch (e) {
      res.status(400).send({ message: 'Something went wrong! Monkeys working on it' });
    }
    if (this.topicModify === undefined) {
      res.status(400).send({ message: 'Something went wrong! Monkeys working on it' });
    }
    res.send({ message: 'Modificado Correctamente' });
  }

  async delete(req, res) {
    const topic = new TopicMdl(req.body);
    try {
      await topic.delete(req.params.topicId).then((result) => {
        this.deleted = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        res.status().send();
      });
    } catch (e) {
      console.error(`error!! ${e}`);
      res.status(400).send({ message: 'Something went wrong! Monkeys working on it' });
    }
    if (this.deleted === undefined) {
      res.status(400).send({ message: 'Something went wrong! Monkeys working on it' });
    }
    if (this.deleted.affectedRows === 0 || this.deleted.affectedRows === undefined) {
      res.status(400).send({ message: 'todo mal' });
    } else {
      res.status(204).send({ message: 'todo bien' });
    }
  }
}
module.exports = new TopicCtrl();
