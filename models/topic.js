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

  static processRequest(data) {
    this.condition = '';
    if (data.q) {
      this.condition = ` && name = '${data.q}'`;
    }
    if (data.sort) {
      this.condition += ` ORDER BY name ${data.sort}`;
    }
    if (data.count) {
      this.condition += ` LIMIT ${data.count}`;
    } else {
      this.condition += ' LIMIT 15';
    }
    if (data.page) {
      this.condition += ` OFFSET ${data.page - 1} `;
    }
    return this.condition;
  }

  static processData(data) {
    const results = [];
    data.forEach((res) => {
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
    if (data.q || data.page || data.count || data.sort) {
      condition = this.processRequest(data);
    } else {
      condition = `&& topic_id = ${Object.values(data)}`
    }
    // if (Object.keys(data) == 'name') {
    //   condition = this.processRequest(data);
    //   // condition = `${Object.keys(data)} = '${Object.values(data)}'`;
    // } else {
    //   condition = `topic_id = ${Object.values(data)}`;
    // }
    console.log(condition);
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
