const db = require('../db');

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

  processRequest(data) {
    const condition = `name = ${data.name}`;
    return  condition;
  }

  static processData(data) {
    const results = [];
    data.forEach((res) => {
      console.log(res)
      results.push(new TopicMdl(res));
    });
    return results;
  }

  static async getAll() {
    await db.get('topic', '*').then((results) => {
      this.res = this.processData(results);
    }).catch((e) => {
      console.log(`Error: ${e}`);
    });
    return this.res;
  }

  static async find(data) {
    let condition;
    console.log(Object.keys(data));
    if (Object.keys(data) == 'name') {
      condition = `${Object.keys(data)} = '${Object.values(data)}'`;
    } else {
      condition = `topic_id = ${Object.values(data)}`;
    }
    await db.get('topic', '*', condition).then((result) => {
      this.topic = this.processData(result);
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return this.topic;
  }

  async save() {
    delete this.topic_id;
    if (this.required()) {
      await db.insert('topic', this).then((result) => {
        this.result = result;
      }).catch((e) => {
        console.error(`.catch(${e})`);
      });
      return this.result;
    }
    return 1;
  }

  async modify(id) {
    const condition = `topic_id = ${id}`;
    const obj = {};
    obj.name = this.name;
    obj.descript = this.descript;
    await db.update('topic', obj, condition).then((result) => {
      this.data = result;
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return this.data;
  }

  async delete(id) {
    const condition = `topic_id = ${id}`;
    await db.del('topic', condition).then((result) => {
      this.result = result;
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return this.result;
  }
}
module.exports = TopicMdl;
