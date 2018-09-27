const db = require('../db');

class ThreadMdl {
  constructor(args) {
    console.log()
    this.id = null || args.id;
    this.subject = null || args.subject;
    this.created = null || args.created;
    this.user_id = null || args.user_id;
    this.topic_id = null || args.topic_id;
  }

  setSubject(s) {
    this.subject = s;
  }

  setCreatedAt(c) {
    this.created = c;
  }

  setUserId(u) {
    const isNumber = /^\d+$/.test(u);
    if (isNumber) {
      this.user_id = u;
    }
  }

  setTopicId(t) {
    const isNumber = /^\d+$/.test(t);
    if (isNumber) {
      this.topic_id = t;
    }
  }

  required() {
    return (this.subject !== undefined
    && this.created !== undefined && this.user_id !== undefined
    && this.topic_id !== undefined);
  }

  processData(data) {
    this.hola = 1;
    const results = [];
    data.forEach((res) => {
      results.push(new ThreadMdl(res));
    });
    return results;
  }

  async getAll() {
    const threads = await db.getAll('threads');
    this.threads = this.processData(threads);
    return this.threads;
  }

  async find(id) {
    const thread = await db.get('threads', 'id', id);
    this.thread = this.processData(thread);
    return this.thread;
  }

  async save() {
    if (this.required()) {
      delete this.id;
      const result = await db.insertTh('threads', this);
      console.log(result);
      return 'done';
    }
    return 'bad reques';
  }

  async delete(id) {
    this.result = await db.del('threads', 'id', id);
    this.result = this.process(this.result);
    if (this.result === undefined || this.result === ){
      return 0;
    }
    return 0;
  }
}
module.exports = ThreadMdl;
