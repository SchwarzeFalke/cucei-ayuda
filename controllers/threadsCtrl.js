const { ThreadMdl } = require('../models');
const { PostMdl } = require('../models');

class ThreadCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.modify = this.modify.bind(this);
    this.delete = this.delete.bind(this);
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
        res.status(400).send({ message: 'Something went wrong! Monkeys working on it' });
      });
      if (data === undefined || data.length === 0) {
        res.status(404).send({
          error: 'you don´t have any data',
        });
      } else {
        res.send(data);
      }
      //  GET query Data
    } else {
      await ThreadMdl.find(query, topicId).then((result) => {
        data = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        res.status(404).send({
          error: 'No se encontró el dato',
        });
      });
      if (data === undefined || data.length === 0) {
        res.status(404).send({
          error: 'No se encontró el dato',
        });
      } else {
        res.send(data);
      }
    }
  }

  async get(req, res) {
    const { threadId } = req.params;
    let data;
    try {
      data = await ThreadMdl.find(threadId);
    } catch (e) {
      res.status(404).send({
        error: 'data not found',
      });
    }
    if (data === undefined || data.length === 0) {
      res.status(404).send({
        error: 'data not found',
      });
    } else {
      res.send(data);
    }
  }

  async create(req, res) {
    req.body.topic_id = req.params.topicId;
    const thread = new ThreadMdl(req.body);
    let response;
    await thread.save().then((result) => {
      response = result;
    }).catch((e) => {
      console.error(`error!! ${e}`);
      res.status(400).send({ message: 'Something went wrong! Monkeys working on it' });
    });
    if (response === undefined) {
      res.status(400).send({
        error: 'Something went wrong, data not saved',
      });
    }
    if (response === 1) {
      res.status(400).send({ message: 'Not enough data' });
    }
    const id = response.insertId;
    if (id === undefined) {
      res.status(400).send({
        error: 'Something went wrong, data not saved',
      });
    }
    if (id > 0) {
      res.status(200).send({ message: 'Registrado Correctamente' });
    } else {
      res.status(400).send({
        error: 'Something went wrong, data not saved',
      });
    }
  }

  async modify(req, res) {
    const thread = new ThreadMdl(req.body);
    let topicModify;
    try {
      await thread.modify(req.params.threadId).then((result) => {
        topicModify = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        res.status(400).send({ error: 'todo mal' });
      });
    } catch (e) {
      res.status(400).send({ message: 'Something went wrong! Monkeys working on it' });
    }
    if (topicModify === undefined) {
      res.status(400).send({ message: 'Something went wrong! Monkeys working on it' });
    }
    res.send({ message: 'Modificado Correctamente' });
  }

  async delete(req, res) {
    const thread = new ThreadMdl(req.body);
    let deleted;
    try {
      await thread.delete(req.params.topicId).then((result) => {
        deleted = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        res.status().send();
      });
    } catch (e) {
      console.error(`error!! ${e}`);
      res.status(400).send({ message: 'Something went wrong! Monkeys working on it' });
    }
    if (deleted === undefined) {
      res.status(400).send({ message: 'Something went wrong! Monkeys working on it' });
    }
    if (deleted.affectedRows === 0) {
      res.status(400).send({ message: 'todo mal' });
    }
    res.status(204).send({ message: 'todo bien' });
  }

/**
  Aqui empiezan las funciones de los posts
 */

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
        res.status(400).send({ message: 'Something went wrong! Monkeys working on it' });
      });
      if (data === undefined || data.length === 0) {
        res.status(404).send({
          error: 'you don´t have any data',
        });
      } else {
        res.send(data);
      }
      //  GET query Data
    } else {
      await PostMdl.find(query, threadId).then((result) => {
        data = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        res.status(404).send({
          error: 'No se encontró el dato',
        });
      });
      if (data === undefined || data.length === 0) {
        res.status(404).send({
          error: 'No se encontró el dato',
        });
      } else {
        res.send(data);
      }
    }
  }

//obtiene un post en especifico
  async getPost(req, res) {
    const { postId } = req.params;
    let data;
    try {
      data = await ThreadMdl.find(postId);
    } catch (e) {
      res.status(404).send({
        error: 'data not found',
      });
    }
    if (data === undefined || data.length === 0) {
      res.status(404).send({
        error: 'data not found',
      });
    } else {
      res.send(data);
    }
  }

  async createPost(req, res) {

    req.body.thread_id = req.params.threadId;
    console.log(req.body);
    const post = new PostMdl(req.body);
    let response;
    await post.save().then((result) => {
      response = result;
    }).catch((e) => {
      console.log('error en controller aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      console.error(`error!! ${e}`);
      res.status(400).send({ message: 'Something went wrong! Monkeys working on it' });
    });
    if (response === undefined) {
      res.status(400).send({
        error: 'Something went wrong, data not saved',
      });
    }
    if (response === 1) {
      res.status(400).send({ message: 'Not enough data' });
    }
    const id = response.insertId;
    if (id === undefined) {
      res.status(400).send({
        error: 'Something went wrong, data not saved',
      });
    }
    if (id > 0) {
      res.status(200).send({ message: 'Registrado Correctamente' });
    } else {
      res.status(400).send({
        error: 'Something went wrong, data not saved',
      });
    }
  }

  async updatePost(req, res) {
    const post = new PostMdl(req.body);
    let topicModify;
    try {
      await post.modify(req.params.postId).then((result) => {
        topicModify = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        res.status(400).send({ error: 'todo mal' });
      });
    } catch (e) {
      res.status(400).send({ message: 'Something went wrong! Monkeys working on it' });
    }
    if (topicModify === undefined) {
      res.status(400).send({ message: 'Something went wrong! Monkeys working on it' });
    }
    res.send({ message: 'Modificado Correctamente' });
  }

  async deletePost(req, res) {
    const post = new PostMdl(req.body);
    let deleted;
    try {
      await post.delete(req.params.postId).then((result) => {
        deleted = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        res.status().send();
      });
    } catch (e) {
      console.error(`error!! ${e}`);
      res.status(400).send({ message: 'Something went wrong! Monkeys working on it' });
    }
    if (deleted === undefined) {
      res.status(400).send({ message: 'Something went wrong! Monkeys working on it' });
    }
    if (deleted.affectedRows === 0) {
      res.status(400).send({ message: 'todo mal' });
    }
    res.status(204).send({ message: 'todo bien' });
  }
}
module.exports = new ThreadCtrl();
