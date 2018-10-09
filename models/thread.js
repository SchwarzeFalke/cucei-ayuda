const db = require('../db');
const PostMdl = require('./post');

class ThreadMdl {
  constructor({
    thread_id, subject, created, stud_code, topic_id
  }) {
    this.thread_id = thread_id;
    this.exist = 1;
    this.subject = subject;
    this.created = created;
    this.stud_code = stud_code;
    this.topic_id = topic_id;
  }

  required() {
    return (this.subject !== undefined
    && this.created !== undefined && this.stud_code !== undefined
    && this.topic_id !== undefined);
  }

  static processRequest(data) {
    let condition = '';
    let count = 10;
    if (data.sort) {
      condition += ` ORDER BY created ${data.sort}`;
    } else {
      condition = ' ORDER BY created';
    }
    if (data.count) {
      condition += ` LIMIT ${data.count}`;
      if (data.count !== count) count = data.count;
    } else {
      condition += ` LIMIT ${count}`;
    }
    if (data.page) {
      condition += ` OFFSET ${(data.page - 1) * count} `;
    }
    return condition;
  }

  static processData(data) {
    const results = [];
    data.forEach((res) => {
      results.push(new ThreadMdl(res));
    });
    return results;
  }

  static async getAll(topicId) {
    let all = ['thread_id', 'exist', 'subject', 'created', 'stud_code', 'topic_id'];
    let res;
    const order = ' ORDER BY created';
    const condition = `topic_id = ${topicId}`;
    await db.get('thread', ['thread_id', 'exist', 'subject', 'created', 'stud_code', 'topic_id'], condition, order).then((results) => {
      res = this.processData(results);
    }).catch((e) => {
      console.log(`Error: ${e}`);
    });
    return res;
  }

  static async find(data, topicId) {
    let condition;
    let order;
    let response;
    if (data.q || data.page || data.count || data.sort) {
      this.condition = `topic_id = ${topicId}`;
      if (data.q) {
        this.condition += `&& subject LIKE '%${data.q}%'`;
      }
      condition = this.condition;
      order = this.processRequest(data);
    } else {
      condition = `thread_id = ${data} && topic_id = ${topicId}`;
    }
    await db.get('thread', ['thread_id', 'exist', 'subject', 'created', 'stud_code', 'topic_id'], condition, order).then((result) => {
      response = this.processData(result);
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return response;
  }

  async save() {
    delete this.thread_id;
    let results;
    console.log(this);
    if (this.required()) {
      await db.insert('thread', this).then((result) => {
        results = result;
      }).catch((e) => {
        console.error(`.catch(${e})`);
        return undefined;
      });
      return results;
    }
    return 1;
  }

  async modify(threadId, topicId) {
    let data;
    const condition = `thread_id = ${threadId} && topic_id = ${topicId}`;
    const obj = {};
    obj.subject = this.subject;
    obj.created = this.created;
    await db.update('thread', obj, condition).then((result) => {
      data = result;
    }).catch((e) => {
      console.error(`.catch(${e})`);
      return undefined;
    });
    console.log(this.data);
    return data;
  }

  static async delete(id) {
    let data;
    const condition = `thread_id = ${id}`;
    const obj = {};
    obj.exist = 0;
    await db.update('thread', obj, condition).then((result) => {
      data = result;
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return data;
  }

  static async deleteReal(id) {
    let data;
    console.log(id);
    await PostMdl.deleteAll(`thread_id = ${id}`).then((result) => {
      data = result;
    }).catch((e) => {
      console.error(`Error:${e}`);
    });
    const condition = `thread_id = ${id}`;
    await db.physicalDel('thread', condition).then((result) => {
      data = result;
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return data;
  }
}
module.exports = ThreadMdl;
