const { ThreadMdl } = require('../models');
const { PostMdl } = require('../models');

class ThreadCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.modify = this.modify.bind(this);
    this.delete = this.delete.bind(this);
    this.getAllPosts = this.getAllPosts.bind(this);
    this.getPost = this.getPost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.modifyJSON = {
      status: 201,
      response: null,
      message: null,
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
    this.badRequestJSON = {
      status: 400,
      response: 'Bad request',
      message: null,
      data: null,
    };
    this.notFoundJSON = {
      status: 404,
      response: 'Noy found',
      message: null,
      data: null,
    };
  }

  async getAll(req, res) {
    const query = req.query;
    const { topicId } = req.params;
    let data;
    //  GET All
    if (Object.keys(query).length === 0 && query.constructor === Object) {
      await ThreadMdl.getAll(topicId).then((result) => {
        data = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        this.badRequestJSON.message = 'Something went wrong! Monkeys working on it';
        res.status(400).send(this.badRequestJSON);
      });
      if (data === undefined || data.length === 0) {
        this.notFoundJSON.message = 'you don´t have any data';
        res.status(404).send(this.notFoundJSON);
      } else {
        this.requestJSON.message = 'Data succesfully retrieve';
        this.requestJSON.data = data;
        res.send(this.requestJSON);
      }
      //  GET query Data
    } else {
      await ThreadMdl.find(query, topicId).then((result) => {
        data = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        this.notFoundJSON.message = 'you don´t have any data';
        res.status(404).send(this.notFoundJSON);
      });
      if (data === undefined || data.length === 0) {
        this.notFoundJSON.message = 'you don´t have any data';
        res.status(404).send(this.notFoundJSON);
      } else {
        this.requestJSON.message = 'Data succesfully retrieve';
        this.requestJSON.data = data;
        res.send(this.requestJSON);
      }
    }
  }

  async get(req, res) {
    const { threadId } = req.params;
    let data;
    try {
      data = await ThreadMdl.find(threadId, req.params.topicId);
    } catch (e) {
      console.error('error!');
      this.notFoundJSON.message = 'you don´t have any data';
      res.status(404).send(this.notFoundJSON);
    }
    if (data === undefined || data.length === 0) {
      this.notFoundJSON.message = 'you don´t have any data';
      res.status(404).send(this.notFoundJSON);
    } else {
      this.requestJSON.message = 'Data succesfully retrieve';
      this.requestJSON.data = data;
      res.send(this.requestJSON);
    }
  }

  async create(req, res) {
    req.body.topic_id = req.params.topicId;
    const date = new Date().toJSON().slice(0, 19).replace('T', ' ');
    req.body.created = date;
    const thread = new ThreadMdl(req.body);
    let response;
    await thread.save().then((result) => {
      response = result;
    }).catch((e) => {
      console.error(`error!! ${e}`);
      this.forbiddenJSON.message = 'Something went wrong! Monkeys working on it';
      res.status(403).send(this.forbiddenJSON);
    });
    if (response === undefined) {
      this.badRequestJSON.message = 'One field is missings or data is wrong';
      res.status(400).send(this.badRequestJSON);
    }
    if (response === 1) {
      this.badRequestJSON.message = 'One field is missings or data is wrong';
      res.status(400).send(this.badRequestJSON);
    }
    const id = response.insertId;
    if (id === undefined) {
      this.badRequestJSON.message = 'One field is missings or data is wrong';
      res.status(400).send(this.badRequestJSON);
    }
    if (id > 0) {
      this.requestJSON.message = 'Data succesfully created';
      this.requestJSON.data = response;
      this.requestJSON.code = 201;
      res.status(201).send(this.requestJSON);
    } else {
      this.badRequestJSON.message = 'One field is missings or data is wrong';
      res.status(400).send(this.badRequestJSON);
    }
  }

  async modify(req, res) {
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    req.body.created = date;
    const thread = new ThreadMdl(req.body);
    let topicModify;
    try {
      await thread.modify(req.params.threadId, req.params.topicId).then((result) => {
        topicModify = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        this.forbiddenJSON.message = 'Something went wrong! Monkeys working on it';
        res.status(403).send(this.forbiddenJSON);
      });
    } catch (e) {
      this.badRequestJSON.message = 'One field is missings or data is wrong';
      res.status(400).send(this.badRequestJSON);
    }
    if (topicModify === undefined) {
      this.badRequestJSON.message = 'One field is missings or data is wrong';
      res.status(400).send(this.badRequestJSON);
    } else {
      this.requestJSON.message = 'Data succesfully modified';
      this.requestJSON.data = topicModify;
      res.status(200).send(this.requestJSON);
    }
  }

  async delete(req, res) {
    let deleted;
    try {
      await ThreadMdl.deleteReal(req.params.threadId).then((result) => {
        deleted = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        this.forbiddenJSON.message = 'Something went wrong! Monkeys working on it';
        res.status(403).send(this.forbiddenJSON);
      });
    } catch (e) {
      console.error(`error!! ${e}`);
      this.forbiddenJSON.message = 'Something went wrong! Monkeys working on it';
      res.status(403).send(this.forbiddenJSON);
    }
    if (deleted === undefined) {
      this.badRequestJSON.message = 'One field is missings or data is wrong';
      res.status(400).send(this.badRequestJSON);
    } else if (deleted.affectedRows === 0) {
      this.badRequestJSON.message = 'One field is missings or data is wrong';
      res.status(400).send(this.badRequestJSON);
    } else {
      this.requestJSON.message = 'Data succesfully deleted';
      this.requestJSON.data = deleted;
      res.status(200).send(this.requestJSON);
    }
  }

//  obtiene todos los post de un thread
  async getAllPosts(req, res) {
    const query = req.query;
    const { threadId } = req.params;
    let data;
    //  GET All
    if (Object.keys(query).length === 0 && query.constructor === Object) {
      await PostMdl.getAll(threadId).then((result) => {
        data = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        this.badRequestJSON.message = 'Something went wrong! Monkeys working on it';
        res.status(400).send(this.badRequestJSON);
      });
      if (data === undefined || data.length === 0) {
        this.notFoundJSON.message = 'you don´t have any data';
        res.status(404).send(this.notFoundJSON);
      } else {
        const message = 'Data succesfully retrieve';
        this.requestJSON.message = message;
        this.requestJSON.data = data;
        res.send(this.requestJSON);
      }
      //  GET query Data
    } else {
      await PostMdl.find(query, threadId).then((result) => {
        data = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        this.badRequestJSON.message = 'Something went wrong! Monkeys working on it';
        res.status(400).send(this.badRequestJSON);
      });
      if (data === undefined || data.length === 0) {
        this.notFoundJSON.message = 'you don´t have any data';
        res.status(404).send(this.notFoundJSON);
      } else {
        const message = 'Data succesfully retrieve';
        this.requestJSON.message = message;
        this.requestJSON.data = data;
        res.send(this.requestJSON);
      }
    }
  }

  async getPost(req, res) {
    const { postId } = req.params;
    let data;
    try {
      data = await PostMdl.find(postId, req.params.threadId);
    } catch (e) {
      this.notFoundJSON.message = 'you don´t have any data';
      res.status(404).send(this.notFoundJSON);
    }
    if (data === undefined || data.length === 0) {
      this.notFoundJSON.message = 'you don´t have any data';
      res.status(404).send(this.notFoundJSON);
    } else {
      this.requestJSON.message = 'Data succesfully retrieve';
      this.requestJSON.data = data;
      res.send(this.requestJSON);
    }
  }

  async createPost(req, res) {
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    req.body.date = date;
    req.body.thread_id = req.params.threadId;
    const post = new PostMdl(req.body);
    let response;
    await post.save().then((result) => {
      response = result;
    }).catch((e) => {
      console.error(`error!! ${e}`);
      this.forbiddenJSON.message = 'Something went wrong! Monkeys working on it';
      res.status(403).send(this.forbiddenJSON);
    });
    if (response === undefined) {
      this.badRequestJSON.message = 'Something went wrong!';
      res.status(400).send(this.badRequestJSON);
    }
    if (response === 1) {
      this.badRequestJSON.message = 'One field is missings.';
      res.status(400).send(this.badRequestJSON);
    }
    const id = response.insertId;
    if (id > 0) {
      this.requestJSON.message = 'Data succesfully created';
      this.requestJSON.data = response;
      this.requestJSON.code = 201;
      res.status(201).send(this.requestJSON);
    } else {
      this.badRequestJSON.message = 'Nothing was saved';
      res.status(400).send(this.badRequestJSON);
    }
  }

  async updatePost(req, res) {
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    req.body.date = date;
    const post = new PostMdl(req.body);
    let topicModify;
    try {
      await post.modify(req.params.postId, req.params.threadId).then((result) => {
        topicModify = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        this.forbiddenJSON.message = 'Something went wrong! Monkeys working on it';
        res.status(403).send(this.forbiddenJSON);
      });
    } catch (e) {
      this.badRequestJSON.message = 'One field is missings or data is wrong';
      res.status(400).send(this.badRequestJSON);
    }
    if (topicModify === undefined) {
      this.badRequestJSON.message = 'One field is missings or data is wrong';
      res.status(400).send(this.badRequestJSON);
    } else {
      this.requestJSON.message = 'Data succesfully modified';
      this.requestJSON.data = topicModify;
      res.status(200).send(this.requestJSON);
    }
  }

  async deletePost(req, res) {
    const post = new PostMdl(req.body);
    let deleted;
    try {
      await post.delete(req.params.postId).then((result) => {
        deleted = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        this.forbiddenJSON.message = 'Something went wrong! Monkeys working on it';
        res.status(403).send(this.forbiddenJSON);
      });
    } catch (e) {
      console.error(`error!! ${e}`);
      this.forbiddenJSON.message = 'Something went wrong! Monkeys working on it';
      res.status(403).send(this.forbiddenJSON);
    }
    if (deleted === undefined) {
      this.badRequestJSON.message = 'One field is missings or data is wrong';
      res.status(400).send(this.badRequestJSON);
    } else if (deleted.affectedRows === 0) {
      this.badRequestJSON.message = 'One field is missings or data is wrong';
      res.status(400).send(this.badRequestJSON);
    } else {
      this.requestJSON.message = 'Data succesfully deleted';
      this.requestJSON.data = deleted;
      res.status(200).send(this.requestJSON);
    }
  }
}
module.exports = new ThreadCtrl();
