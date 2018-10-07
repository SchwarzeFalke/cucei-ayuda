const db = require('../db');
const { ThreadMdl } = require('../models');

class TopicMdl {
  constructor(obj) {
    this.topic_id = obj.topic_id;
    this.name = obj.name;
    this.descript = obj.descript;
    this.exist = obj.exist;
  }

  required() {
    return (this.name !== undefined
    && this.descript !== undefined);
  }

  static processRequest(data) {
    // this.condition = '';
    // if (data.q) {
    //   this.condition = ` && name LIKE '%${data.q}%'`;
    // }
    let condition = '';
    if (data.sort) {
      condition = ` ORDER BY name ${data.sort}`;
    }
    if (data.count) {
      condition += ` LIMIT ${data.count}`;
    } else {
      condition += ' LIMIT 15';
    }
    if (data.page) {
      condition += ` OFFSET ${data.page - 1} `;
    }
    return condition;
  }

  static processData(data) {
    const results = [];
    data.forEach((res) => {
      results.push(new TopicMdl(res));
    });
    return results;
  }

  static async getAll() {
    let res;
    await db.get('topic', '*', '').then((results) => {
      res = this.processData(results);
    }).catch((e) => {
      console.log(`Error: ${e}`);
    });
    return res;
  }

  static async find(data) {
    let condition;
    let order;
    let response;
    if (data.q || data.page || data.count || data.sort) {
      this.condition = '';
      if (data.q) {
        this.condition = `name LIKE '%${data.q}%'`;
      }
      condition = this.condition;
      order = this.processRequest(data);
      console.log(order);
    } else {
      condition = `topic_id = ${Object.values(data)}`;
    }
    await db.get('topic', '*', condition, order).then((result) => {
      response = this.processData(result);
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return response;
  }

  async save() {
    let results;
    delete this.topic_id;
    if (this.required()) {
      await db.insert('topic', this).then((result) => {
        results = result;
      }).catch((e) => {
        console.error(`.catch(${e})`);
      });
      return results;
    }
    return 1;
  }

  async modify(id) {
    let data;
    const condition = `topic_id = ${id}`;
    const obj = {};
    obj.name = this.name;
    obj.descript = this.descript;
    await db.update('topic', obj, condition).then((result) => {
      data = result;
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return data;
  }

  async delete(id) {
    let data;
    const condition = `topic_id = ${id}`;
    try {
      ThreadMdl.deleteAll()
    } catch (e) {

    }
    await db.del('topic', condition).then((result) => {
      data = result;
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return data;
  }
}
module.exports = TopicMdl;
