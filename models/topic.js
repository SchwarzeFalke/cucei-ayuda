const db = require('../db');

class TopicMdl {
  constructor({
    id, name, descriptcion, exist,
  }) {
    this.id = id;
    this.name = name;
    this.descriptcion = descriptcion;
    this.exist = exist;
  }

  required() {
    return (this.name !== undefined
    && this.descriptcion !== undefined);
  }

  static processData(data) {
    const results = [];
    data.forEach((res) => {
      results.push(new TopicMdl(res));
    });
    return results;
  }

  static async getAll() {
    let topics = await db.getAll('topic');
    topics = this.processData(topics);
    return topics;
  }

  static async find(id) {
    let topic = await db.get('topic', 'id', id);
    topic = this.processData(topic);
    return topic;
  }

  async save() {
    let result;
    delete this.id;
    if (this.required()) {
      try {
        result = await db.insertTh('topic', this);
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
