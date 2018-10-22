const { TopicMdl } = require('../models');
const { ThreadMdl } = require('../models');
const { PostMdl } = require('../models');

// FIXME Todos los metodos deben estar documentados
// FIXME En lugar de hacer los send de cada error, podria ser un next con error y tener un metodo manejador de errores
// FIXME Recomiendo manejar los promises con await y try-catch en lugar de then y catch

class TopicCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.modify = this.modify.bind(this);
    this.delete = this.delete.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
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

/**
 * [getAll is a function that returns all the topics from the db or specific data
 * specified in a query. First it validates if we sent a query, if you send a
 * query it sends it to a function of topicMdl (modles/topicMdl), else it call
 * a function to get all the topics registered in the db].
 * @param  {Object}  req [description]
 * @param  {Object}  res [response sent to the browser with the data extracted,
 * a message, a status and a response]
 * @return {Void}
 */
  async getAll(req, res) {
    const query = req.query;
    //  GET ALL
    if (Object.keys(query).length === 0 && query.constructor === Object) {
      try {
        this.data = await TopicMdl.getAll();
        if (this.data === undefined || this.data.length === 0) {
          this.notFoundJSON.message = 'you don´t have any data';
          res.status(404).send(this.notFoundJSON);
        } else {
          this.requestJSON.message = 'Data succesfully retrieve';
          this.requestJSON.data = this.data;
          res.send(this.requestJSON);
        }
      } catch (e) {
        console.error(`error!! ${e}`);
        this.badRequestJSON.message = 'Something went wrong! Monkeys working on it';
        res.status(400).send(this.badRequestJSON);
      }
      //  GET query data
    } else {
      try {
        this.data = await TopicMdl.find(query);
        if (this.data === undefined || this.data.length === 0) {
          this.notFoundJSON.message = 'you don´t have any data';
          res.status(404).send(this.notFoundJSON);
        } else {
          this.requestJSON.message = 'Data succesfully retrieve';
          this.requestJSON.data = this.data;
          res.send(this.requestJSON);
        }
      } catch (e) {
        console.error(`error!! ${e}`);
        this.notFoundJSON.message = 'you don´t have any data';
        res.status(404).send(this.notFoundJSON);
      }
    }
  }
/**
 * [get description]
 * @param  {[type]}  req [description]
 * @param  {[type]}  res [description]
 * @return {Promise}     [description]
 */

  async get(req, res) {
    const { topicId } = req.params;
    try {
      await TopicMdl.find(topicId).then((result) => {
        this.data = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        this.notFoundJSON.message = 'you don´t have any data';
        res.status(404).send(this.notFoundJSON);
      });
    } catch (e) {
      console.error(`error!! ${e}`);
      this.notFoundJSON.message = 'you don´t have any data';
      res.status(404).send(this.notFoundJSON);
    }
    if (this.data === undefined || this.data.length === 0) {
      this.notFoundJSON.message = 'you don´t have any data';
      res.status(404).send(this.notFoundJSON);
    } else {
      this.requestJSON.message = 'Data succesfully retrieve';
      this.requestJSON.data = this.data;
      res.send(this.requestJSON);
    }
  }

  async create(req, res) {
    const topic = new TopicMdl(req.body);
    await topic.save().then((result) => {
      this.response = result;
    }).catch((e) => {
      console.error(`error!! ${e}`);
      this.badRequestJSON.message = 'Something went wrong! Monkeys working on it';
      res.status(400).send(this.badRequestJSON);
    });
    if (this.response === undefined) {
      this.badRequestJSON.message = 'Something went wrong! Monkeys working on it';
      res.status(400).send(this.badRequestJSON);
    }
    if (this.response === 1) {
      this.badRequestJSON.message = 'One field is missings or data is wrong';
      res.status(400).send(this.badRequestJSON);
    }
    const id = this.response.insertId;
    if (id > 0) {
      this.requestJSON.message = 'Data succesfully created';
      this.requestJSON.data = this.response;
      this.requestJSON.code = 201;
      res.status(201).send(this.requestJSON);
    } else {
      this.badRequestJSON.message = 'Something went wrong! Monkeys working on it';
      res.status(400).send(this.badRequestJSON);
    }
  }

  async modify(req, res) {
    const topic = new TopicMdl(req.body);
    try {
      await topic.modify(req.params.topicId).then((result) => {
        this.topicModify = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        this.badRequestJSON.message = 'Something went wrong! Monkeys working on it';
        res.status(400).send(this.badRequestJSON);
      });
    } catch (e) {
      this.badRequestJSON.message = 'Something went wrong! Monkeys working on it';
      res.status(400).send(this.badRequestJSON);
    }
    if (this.topicModify === undefined) {
      this.badRequestJSON.message = 'One field is missings or data is wrong';
      res.status(400).send(this.badRequestJSON);
    } else {
      this.requestJSON.message = 'Data succesfully modified';
      this.requestJSON.data = this.topicModify;
      res.status(200).send(this.requestJSON);
    }
  }

  async delete(req, res) {
    const topic = new TopicMdl(req.body);
    try {
      await topic.delete(req.params.topicId).then((result) => {
        this.deleted = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        this.badRequestJSON.message = 'One field is missings or data is wrong';
        res.status(400).send(this.badRequestJSON);
      });
    } catch (e) {
      console.error(`error!! ${e}`);
      this.badRequestJSON.message = 'One field is missings or data is wrong';
      res.status(400).send(this.badRequestJSON);
    }
    if (this.deleted === undefined) {
      this.badRequestJSON.message = 'One field is missings or data is wrong';
      res.status(400).send(this.badRequestJSON);
    }
    if (this.deleted.affectedRows === 0 || this.deleted.affectedRows === undefined) {
      this.badRequestJSON.message = 'One field is missings or data is wrong';
      res.status(400).send(this.badRequestJSON);
    } else {
      this.requestJSON.message = 'Data succesfully deleted';
      this.requestJSON.data = this.deleted;
      res.status(200).send(this.requestJSON);
    }
  }

  async deleteAll(req, res) {
    const topic = new TopicMdl(req.body);
    let changed = 0;
    let resultado;
    try {
      resultado = await topic.deleteAll(req.params.topicId);
    } catch (e) {
      console.error(`error!! ${e}`);
      if (resultado === 1) {
        this.badRequestJSON.message = 'One field is missings or data is wrong';
        changed = 1;
        res.status(400).send(this.badRequestJSON);
      }
    }
    try {
      await topic.delete(req.params.topicId).then((result) => {
        this.deleted = result;
      }).catch((e) => {
        console.error(`error!! ${e}`);
        if (changed === 0) {
          this.badRequestJSON.message = 'One field is missings or data is wrong';
          changed = 1;
          res.status(400).send(this.badRequestJSON);
        }
      });
    } catch (e) {
      console.error(`error!! ${e}`);
      if (changed === 0) {
        this.badRequestJSON.message = 'One field is missings or data is wrong';
        changed = 1;
        res.status(400).send(this.badRequestJSON);
      }
    }
    if (this.deleted === undefined) {
      if (changed === 0) {
        this.badRequestJSON.message = 'One field is missings or data is wrong';
        changed = 1;
        res.status(400).send(this.badRequestJSON);
      }
    } else {
      this.requestJSON.message = 'Data succesfully deleted';
      this.requestJSON.data = this.deleted;
      res.status(200).send(this.requestJSON);
    }
  }
}
module.exports = new TopicCtrl();
