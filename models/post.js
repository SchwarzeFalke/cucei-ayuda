const db = require('../db');

class PostMdl {
  constructor({
    post_id, content, stud_code, thread_id, date
  }) {
    this.post_id = post_id;
    this.content = content;
    this.exist = 1;
    this.stud_code = stud_code;
    this.thread_id = thread_id;
    this.date = date;
  }

  required() {
    return (this.content !== undefined
    && this.exist !== undefined && this.stud_code !== undefined
    && this.thread_id !== undefined && this.date !== undefined);
  }

  static processRequest(data) {
    let condition = '';
    if (data.sort) {
      condition += ` ORDER BY date ${data.sort}`;
    } else {
      condition += ' ORDER BY date';
    }
    return condition;
  }

  static processData(data) {
    const results = [];
    data.forEach((res) => {
      results.push(new PostMdl(res));
    });
    return results;
  }

  static async getAll(threadId) {
    let all = ['post_id', 'content', 'exist', 'stud_code', 'thread_id', 'exist', 'date'];
    const order = ' ORDER BY date';
    let res;
    const condition = `thread_id = ${threadId}`;
    await db.get('post', ['post_id', 'content', 'exist', 'stud_code', 'thread_id', 'exist', 'date'], condition, order).then((results) => {
      res = this.processData(results);
    }).catch((e) => {
      console.log(`Error: ${e}`);
    });
    return res;
  }

  static async find(data, threadId) {
    let condition;
    let order;
    let response;
    if (data.q || data.sort) {
      this.condition = `thread_id = ${threadId}`;
      if (data.q) {
        this.condition += `&& content LIKE '%${data.q}%'`;
      }
      condition = this.condition;
      order = this.processRequest(data);
    } else {
      condition = ` post_id = ${data} && thread_id = ${threadId}`;
    }
    console.log(condition);
    await db.get('post', ['post_id', 'content', 'exist', 'stud_code', 'thread_id', 'exist', 'date'], condition, order).then((result) => {
      response = this.processData(result);
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return response;
  }

  async save() {
    delete this.post_id;
    let results;
    console.log(this);
    if (this.required()) {
      await db.insert('post', this).then((result) => {
        results = result;
      }).catch((e) => {
        console.error(`.catch(${e})`);
      });
      console.log(results);
      return results;
    }
    return 1;
  }

  async modify(postId, threadId) {
    let data;
    const condition = `post_id = ${postId} && thread_id = ${threadId}`;
    const obj = {};
    obj.content = this.content;
    obj.date = this.date;
    await db.update('post', obj, condition).then((result) => {
      data = result;
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return data;
  }

  async delete(id) {
    let data;
    const condition = `post_id = ${id}`;
    await db.physicalDel('post', condition).then((result) => {
      if (data !== undefined) {
        data = result;
      } else {
        data = undefined;
      }
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return data;
  }

  static async deleteAll(condition) {
    await db.physicalDel('post', condition).then((result) => {
      this.result = result;
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return this.result;
  }
}
module.exports = PostMdl;
