const db = require('../db');

// tienes que regresar la clase, y en controllers creas instancias de lo que resgresaste
// por lo tanto  cada funcion regresa una instancia tambien y se lo agregas a un usuario


class Thread {
  constructor(args) {
    this.subject = args.subject;
    this.created = args.created;
    this.user_id = args.user_id;
    this.topic_id = args.topic_id;
  }
  // construct(args) {
  //   this.setSubject(args.subject);
  //   this.setCreatedAt(args.created);
  //   this.setUserId(args.user_id);
  //   this.setTopicId(args.topic_id);
  // }

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

  async all() {
    const threads = await db.getAll('threads');
    this.threads = threads;
    return this.threads;
  }

  async find(id) {
    const thread = await db.get('threads', 'id', id);
    this.thread = thread;
    console.log(thread);
    return this.thread;
  }

  async save() {
    if (this.required()) {
      const result = await db.insert('threads', this);
      return result;
    }
    return 'bad reques';
  }

  async delete(id) {
    this.result = await db.del('threads', 'id', id);
    return this.result;
  }
}
module.exports = new Thread();
