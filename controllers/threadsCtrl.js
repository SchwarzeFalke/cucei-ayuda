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
    const threads = new ThreadMdl({});
    this.data = await threads.getAll();
    if (this.data === undefined || this.data.length === 0) {
      res.status(404).send({
        error: 'you don´t have any data',
      });
    } else {
      res.send(this.data);
    }
  }

  async get(req, res) {
    const thread = new ThreadMdl({});
    this.threadId = req.params.threadId;
    this.data = await thread.find(this.threadId);
    if (this.data === undefined || this.data.length === 0) {
      res.status(404).send({
        error: 'data not found',
      });
    } else {
      res.send(this.data);
    }
  }

  async create(req, res) {
    const thread = new ThreadMdl(req.body);
    this.response = await thread.save();
    if (this.response === 'bad reques') {
      res.status(400).send({
        error: 'bad reques',
      });
    } else if (this.response === 'done') {
      res.status(201).send(this.response);
    }
  }

  modify(req, res) {}

  async delete(req, res) {
    const thread = new ThreadMdl(req.body);
    this.deleted = thread.delete(req.params.threadId);
    if(this.deleted === )
  }

  getAllPosts(req, res) {}

  getPost(req, res) {}
  createPost() {}
  //   this.modifyComment = this.modifyComment.bind(this);
  // this.deleteComment = this.deleteComment.bind(this);
}
module.exports = new ThreadCtrl();
