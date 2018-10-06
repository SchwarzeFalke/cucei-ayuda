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
    //  GET All
    if (Object.keys(query).length === 0 && query.constructor === Object) {
      await ThreadMdl.getAll(topicId).then((result) => {
        this.data = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        res.status(400).send({ message: 'Something went wrong! Monkeys working on it' });
      });
      if (this.data === undefined || this.data.length === 0) {
        res.status(404).send({
          error: 'you don´t have any data',
        });
      } else {
        res.send(this.data);
      }
      //  GET query Data
    } else {
      await ThreadMdl.find(query, topicId).then((result) => {
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
    // try {
    //   this.data = await ThreadMdl.getAll();
    // } catch (e) {
    //   console.log(e);
    //   res.status(404).send({
    //     code: 404,
    //     error: 'you don´t have any data',
    //   });
    // }
    // if (this.data === undefined || this.data.length === 0 || this.data === 0) {
    //   res.status(404).send({
    //     code: 404,
    //     error: 'you don´t have any data',
    //   });
    // } else {
    //   res.send(this.data);
    // }
  }

  async get(req, res) {
    const { threadId } = req.params;
    try {
      this.data = await ThreadMdl.find(threadId);
    } catch (e) {
      if (this.data === undefined || this.data.length === 0) {
        res.status(404).send({
          error: 'data not found',
        });
      }
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
    req.body.topic_id = req.params.topicId;
    const thread = new ThreadMdl(req.body);
    await thread.save().then((result) => {
      this.response = result;
    }).catch((e) => {
      console.error(`error!! ${e}`);
      res.status(400).send({ message: 'Something went wrong! Monkeys working on it' });
    });
    if (this.response === 1) {
      res.status(400).send({ message: 'Not enough data' });
    }
    const id = this.response.insertId;
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
    try {
      await thread.modify(req.params.threadId).then((result) => {
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
    const thread = new ThreadMdl(req.body);
    this.deleted = await thread.delete(req.params.threadId);
    if (this.deleted === 1) {
      res.status(200).send({ message: 'Eliminado correctamente' });
    } else {
      res.status(400).send({ error: 'No se ha podido eliminar el elemento' });
    }
  }
/**
  Aqui empiezan las funciones de los posts
 */

//obtiene todos los post de un thread
  async getAllPosts(req, res) {
    const data = await PostMdl.getAll(req.params.threadId);
    if (data === undefined || data.length === 0) {
      res.status(404).send({
        error: 'you don´t have any data',
      });
    } else {
      res.send(data);
    }
  }

//obtiene un post en especifico
  async getPost(req, res) {
    const postId = req.params.postId;
    console.log("ESTE ES UN POSTid: ", postId);
    const data = await PostMdl.find(postId);
    if (data === undefined || data.length === 0) {
      res.status(404).send({
        error: 'data not found',
      });
    } else {
      res.send(data);
    }
  }

  async createPost(req, res) {
    this.hola = 1;
    const posts = new PostMdl(req.body);
    const response = await posts.save(req.params.threadId);
    if (response === 'bad reques') {
      res.status(400).send({
        error: 'bad reques',
      });
    } else if (response === 1) {
      res.status(200).send({ message: 'Registrado Correctamente' });
    } else {
      res.status(409).send({ error: 'No se pudo crear.' });
    }
  }

  async updatePost(req, res) {
    const post = new PostMdl(req.body);
    this.response = await post.modify(req.params.postId);
    res.status(200).send(this.response);
  }

  async deletePost(req, res) {
    const post = new PostMdl(req.body);
    this.delete = await post.delete(req.params.postId);
    if (this.delete === 1) {
      res.status(200).send({ message: 'Eliminado correctamente' });
    } else {
      res.status(400).send({ error: 'No se ha podido eliminar el elemento' });
    }
  }
  //   this.modifyComment = this.modifyComment.bind(this);
  // this.deleteComment = this.deleteComment.bind(this);
}
module.exports = new ThreadCtrl();
