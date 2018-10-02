const db = require('../db');

class PostMdl {
  constructor({
    post_id, content, exist, stud_code, thread_id
  }) {
    this.post_id = post_id;
    this.content = content;
    this.exist = exist;
    this.stud_code = stud_code;
    this.thread_id = thread_id;
  }

  required() {
    return (this.content !== undefined
    && this.exist !== undefined && this.stud_code !== undefined
    && this.thread_id !== undefined);
  }

  static processData(data) {
    const results = [];
    data.forEach((res) => {
      results.push(new PostMdl(res));
    });
    return results;
  }

  static async getAll(id) {
    try {
      this.posts = await db.find('post', 'thread_id', id);
    } catch (e) {
      console.log(e);
    }
    this.posts = this.processData(this.posts);
    return this.posts;
  }

  static async find(id) {
    try {
      this.post = await db.find('post', 'post_id', id);
    } catch (e) {
      console.log(e);
      return e;
    }
    const post = this.processData(this.post);
    return post;
  }

  async save(threadId) {
    this.thread_id = Number(threadId);
    delete this.post_id;
    if (this.required()) {
      try {
        this.result = await db.insert('post', this);
      } catch (e) {
        if (e) {
          console.log(e);
          return 'error';
        }
      }
      const id = this.result.insertId;
      if (id > 0) {
        return 1;
      }
      return 0;
    }
    return 'bad reques';
  }

  async modify() {
    const condition = `post_id = ${this.post_id}`;
    const obj = {};
    obj.content = this.content;
    //obj.created = this.created;
    console.log(obj);
    try {
      this.data = await db.update('post', obj, condition);
    } catch (e) {
      console.log(e);
    }
    return this.data;
  }

  async delete(id) {
    try {
      this.result = await db.del('post', 'post_id', id);
    } catch (e) {
      return 0;
    }
    if (this.result.affectedRows === 0) {
      return 0;
    }
    return 1;
  }
}
module.exports = PostMdl;
