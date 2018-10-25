const {
  ThreadMdl,
  PostMdl,
} = require('../models');

// FIXME Todos los metodos deben estar documentados
// FIXME En lugar de hacer los send de cada error, podria ser un next con error y tener un metodo manejador de errores
// FIXME Recomiendo manejar los promises con await y try-catch en lugar de then y catch

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
  }

  /**
 * getAll: gets all the data from the DB by calling a model, it offers you
 * two ways of retrieving the data, one by sending a query or the other
 * is getting everything.
 * @param  {Object}  req
 * @param  {Object}  res
 */
  async getAll(req, res) {
    const { query } = req;
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

  /**
 * get: gets data using an specific id.
 * @param  {Object}  req
 * @param  {Object}  res
 */
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
    if (response === 1 || response === 2) {
      this.badRequestJSON.message = 'One field is missings or data is wrong';
      res.status(400).send(this.badRequestJSON);
    }
    console.log(response);
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
        if (topicModify === undefined) {
          this.badRequestJSON.message = 'One field is missings or data is wrong';
          res.status(400).send(this.badRequestJSON);
        } else {
          this.modifyJSON.message = 'Data succesfully modified';
          this.modifyJSON.data = topicModify;
          res.status(201).send(this.modifyJSON);
        }
      }).catch((e) => {
        console.error(`error!! ${e}`);
        this.forbiddenJSON.message = 'Something went wrong! Monkeys working on it';
        res.status(403).send(this.forbiddenJSON);
      });
    } catch (e) {
      this.badRequestJSON.message = 'One field is missings or data is wrong';
      res.status(400).send(this.badRequestJSON);
    }
  }

  async delete(req, res) {
    let deleted;
    try {
      await ThreadMdl.deleteReal(req.params.threadId).then((result) => {
        deleted = result;
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
      this.badRequestJSON.message = 'Something went wrong! Maybe thread does not exist';
      this.badRequestJSON.data = response;
      res.status(400).send(this.badRequestJSON);
    }
    const id = response.insertId;
    if (response === 1 || id === undefined) {
      this.badRequestJSON.message = 'One field is missings.';
      this.badRequestJSON.data = response;
      res.status(400).send(this.badRequestJSON);
    } else if (id > 0) {
      this.requestJSON.message = 'Data succesfully created';
      this.requestJSON.data = response;
      this.requestJSON.code = 201;
      res.status(201).send(this.requestJSON);
    } else {
      this.badRequestJSON.message = 'Nothing was saved';
      this.badRequestJSON.data = response;
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
        if (topicModify === undefined) {
          this.badRequestJSON.message = 'One field is missings or data is wrong';
          res.status(400).send(this.badRequestJSON);
        } else {
          this.requestJSON.message = 'Data succesfully modified';
          this.requestJSON.data = topicModify;
          res.status(200).send(this.requestJSON);
        }
      }).catch((e) => {
        console.error(`error!! ${e}`);
        this.forbiddenJSON.message = 'Something went wrong! Monkeys working on it';
        res.status(403).send(this.forbiddenJSON);
      });
    } catch (e) {
      this.badRequestJSON.message = 'One field is missings or data is wrong';
      res.status(400).send(this.badRequestJSON);
    }
  }

  async deletePost(req, res) {
    const post = new PostMdl(req.body);
    let deleted;
    try {
      await post.delete(req.params.postId).then((result) => {
        deleted = result;
        if (deleted === undefined) {
          this.badRequestJSON.message = 'Something went wrong! Check the id';
          res.status(400).send(this.badRequestJSON);
        } else if (deleted.affectedRows === 0) {
          this.badRequestJSON.message = 'Something went wrong! Check the id';
          res.status(400).send(this.badRequestJSON);
        } else {
          this.requestJSON.message = 'Data succesfully deleted';
          this.requestJSON.data = deleted;
          res.status(200).send(this.requestJSON);
        }
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
  }
}
module.exports = new ThreadCtrl();
