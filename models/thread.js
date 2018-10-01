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
    try {
      this.threads = await db.getAll('thread');
    } catch (e) {
      console.log(e);
    }
    this.threads = this.processData(this.threads);
    return this.threads;
  }

  static async find(id) {
    try {
      const condition = `thread_id = ${id}`;
      this.thread = await db.get('thread', '*', condition);
    } catch (e) {
      console.log(e);
      return e;
    }
    let thread = this.processData(this.thread);
    return thread;
  }

  async save() {
    let result;
    delete this.id;
    if (this.required()) {
      try {
        result = await db.insert('thread', this);
      } catch (e) {
        if (e) {
          console.log(e);
          return 'error';
        }
      }
      const id = result.insertId;
      if (id > 0) {
        return 1;
      }
      return 0;
    }
    console.log("dfasdfasd");
    return 'bad reques';
  }

  async modify({ thread_id, content, date}) {
    let condition = `thread_id = ${thread_id}`;

  }

  async delete(id) {
    try {
      this.result = await db.del('threads', 'id', id);
    } catch (e) {
      return 0;
    }
    if (this.result.affectedRows === 0) {
      return 0;
    }
    return 1;
  }
}
module.exports = ThreadMdl;
