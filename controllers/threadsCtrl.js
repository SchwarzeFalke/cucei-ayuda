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
    console.log(req.params);
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
    this.response = await thread.save();
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
    const thread = new ThreadMdl(req.body);
    this.response = await thread.modify(req.params.threadId);
    res.status(200).send(this.response);
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
