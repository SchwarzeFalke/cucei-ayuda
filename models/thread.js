const db = require('../db');

class ThreadMdl {
  constructor({
    thread_id, subject, created, stud_code, topic_id, exist
  }) {
    this.thread_id = thread_id;
    this.exist = exist;
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

  static processData(data) {
    const results = [];
    data.forEach((res) => {
      results.push(new ThreadMdl(res));
    });
    return results;
  }

  static async getAll() {
    await db.get('thread', '*').then((results) => {
      this.res = this.processData(results);
    }).catch((e) => {
      console.log(`Error: ${e}`);
    });
    return this.res;
  }

  static async find(data) {
    let condition;
    if (Object.keys(data) == 'subject') {
      condition = `${Object.keys(data)} = '%${Object.values(data)}%'`;
    } else {
      condition = `thread_id = ${Object.values(data)}`;
    }
    await db.get('thread', '*', condition).then((result) => {
      this.thread = this.processData(result);
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return this.thread;
  }

  async save() {
    delete this.thread_id;
    if (this.required()) {
      await db.insert('thread', this).then((result) => {
        this.result = result;
      }).catch((e) => {
        console.error(`.catch(${e})`);
      });
      return this.result;
    }
    return 1;
  }

  async modify(threadId) {
    const condition = `thread_id = ${threadId}`;
    const obj = {};
    obj.name = this.name;
    obj.descript = this.descript;
    await db.update('thread', obj, condition).then((result) => {
      this.data = result;
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return this.data;
  }

  async delete(id) {
    const condition = `thread_id = ${id}`;
    await db.del('thread', condition).then((result) => {
      this.result = result;
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return this.result;
  }
}
module.exports = ThreadMdl;
