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
    this.data = await TopicMdl.getAll();
    if (this.data === undefined || this.data.length === 0
       || this.data.length === 0) {
      res.status(404).send({
        error: 'you don´t have any data',
      });
    } else {
      res.send(this.data);
    }
  }

  async get(req, res) {
    this.topicId = req.params.topicId;
    const data = await TopicMdl.find(this.topicId);
    if (data === undefined || data.length === 0) {
      res.status(404).send({
        error: 'data not found',
      });
    } else {
      res.send(data);
    }
  }

  async create(req, res) {
    const topic = new TopicMdl(req.body);
    this.response = await topic.save();
    if (this.response === 'bad reques') {
      res.status(400).send({
        error: 'bad request',
      });
    } else if (this.response === 1) {
      res.status(200).send({ message: 'Registrado Correctamente' });
    } else {
      res.status(409).send({ error: 'No se completó' });
    }
  }

  async modify(req, res) {
    const topicModify = await TopicMdl.modify(req.body);
  }

  async delete(req, res) {
    const topic = new TopicMdl(req.body);
    this.deleted = await topic.delete(req.params.topicId);
    if (this.deleted === 1) {
      res.status(200).send({ message: 'todo bien' });
    } else {
      res.status(400).send({ message: 'todo mal' });
    }
  }

  getAllPosts(req, res) {}

  getPost(req, res) {}
  createPost() {}
  //   this.modifyComment = this.modifyComment.bind(this);
  // this.deleteComment = this.deleteComment.bind(this);
}
module.exports = new TopicCtrl();
