const db = require('../db');

class TopicMdl {
  constructor({
    id, name, descriptcion, exist
  }) {
    this.topic_id = id;
    this.name = name;
    this.descript = descriptcion;
    this.exist = exist;
  }

  required() {
    return (this.name !== undefined
    && this.descriptcion !== undefined);
  }

  processRequest(data) {
    const condition = `name = ${data.name}`
    return  condition;
  }

  static processData(data) {
    const results = [];
    data.forEach((res) => {
      results.push(new TopicMdl(res));
    });
    return results;
  }

  static async getAll() {
    try {
      this.topics = await db.get('topic', '*');
      this.topics = this.processData(this.topics);
    } catch (e) {
      console.log(`Error: ${e}`);
      return 1;
    }
    return this.topics;
  }

  static async find(id, query) {
    try {
      let condition = `topic_id = ${id}`;
      if (Object.keys(query).length !== 0 && query.constructor !== Object) {
        condition = this.processRequest(query);
      }
      this.topic = await db.get('topic', '*', condition);
      this.topic = this.processData(this.topic);
    } catch (e) {
      console.error(`.catch(${e})`);
      return 0;
    }
    return this.topic;
  }

  async save() {
    let result;
    delete this.id;
    if (this.required()) {
      try {
        result = await db.insert('topic', this);
      } catch (e) {
        if (e) {
          return 'error';
        }
      }
      const id = result.insertId;
      if (id > 0) {
        return 1;
      }
      return 0;
    }
    return 'bad reques';
  }

  async modify({ id, content, date}) {
    let query = ''
  }

  async delete(id) {
    try {
      this.result = await db.del('topic', 'id', id);
    } catch (e) {
      return 0;
    }
    if (this.result.affectedRows === 0) {
      return 0;
    }
    return 1;
  }
}
module.exports = TopicMdl;
