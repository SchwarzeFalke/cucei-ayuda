const { ThreadMdl } = require('../models');

class ThreadCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.modify = this.modify.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    let data = await ThreadMdl.getAll();
    if (data === undefined || data.length === 0) {
      res.status(404).send({
        error: 'you don´t have any data',
      });
    } else {
      res.send(data);
    }
  }

  async get(req, res) {
    this.threadId = req.params.threadId;
    const data = await ThreadMdl.find(this.threadId);
    if (data === undefined || data.length === 0) {
      res.status(404).send({
        error: 'data not found',
      });
    } else {
      res.send(data);
    }
  }

  async create(req, res) {
    const thread = new ThreadMdl(req.body);
    try {
      this.response = await thread.save();
    } catch (e) {
      console.log(e);
      res.status(409).send(e);
    }
    if (this.response === 'bad reques') {
      res.status(400).send({
        error: 'bad reques',
      });
    } else if (this.response === 1) {
      res.status(201).send(this.response);
    }
  }

  modify(req, res) {}

  async delete(req, res) {
    const thread = new ThreadMdl(req.body);
    this.deleted = thread.delete(req.params.threadId);
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
module.exports = new ThreadCtrl();
