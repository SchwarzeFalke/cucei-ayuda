const db = require('../db');

class PostMdl {
  constructor({
    post_id, content, exist, stud_code, thread_id, date
  }) {
    this.post_id = post_id;
    this.content = content;
    this.exist = exist;
    this.stud_code = stud_code;
    this.thread_id = thread_id;
    this.date = date;
  }

  required() {
    return (this.content !== undefined
    && this.exist !== undefined && this.stud_code !== undefined
    && this.thread_id !== undefined && this.date !== undefined);
  }

  static processData(data) {
    const results = [];
    data.forEach((res) => {
      results.push(new PostMdl(res));
    });
    return results;
  }

  static async getAll() {
    await db.get('post', '*').then((results) => {
      this.res = this.processData(results);
    }).catch((e) => {
      console.log(`Error: ${e}`);
    });
    return this.res;
  }

  static async find(data) {
    let condition;
    if (Object.keys(data) == 'content') {
      condition = `${Object.keys(data)} = '%${Object.values(data)}%'`;
    } else {
      condition = `post_id = ${Object.values(data)}`;
    }
    await db.get('post', '*', condition).then((result) => {
      this.post = this.processData(result);
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return this.post;
  }

  async save() {
    delete this.post_id;
    if (this.required()) {
      await db.insert('post', this).then((result) => {
        this.result = result;
      }).catch((e) => {
        console.error(`.catch(${e})`);
      });
      return this.result;
    }
    return 1;
  }

  async modify(postId) {
    const condition = `post_id = ${postId}`;
    const obj = {};
    obj.content = this.content;
    obj.date = this.date;
    await db.update('post', obj, condition).then((result) => {
      this.data = result;
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return this.data;
  }

  async delete(id) {
    const condition = `post_id = ${id}`;
    await db.del('post', condition).then((result) => {
      this.result = result;
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return this.result;
  }
}
module.exports = PostMdl;
