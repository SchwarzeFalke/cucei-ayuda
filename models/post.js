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

  static processRequest(data, threadId) {
    this.condition = ` && thread_id = ${threadId}`;
    if (data.q) {
      this.condition = ` && subject LIKE '%${data.q}%'`;
    }
    if (data.sort) {
      this.condition += ` ORDER BY date ${data.sort}`;
    }
    return this.condition;
  }

  static processData(data) {
    const results = [];
    data.forEach((res) => {
      results.push(new PostMdl(res));
    });
    return results;
  }

  static async getAll(threadId) {
    let res;
    const condition = ` && thread_id = ${threadId}`;
    await db.get('post', '*').then((results) => {
      res = this.processData(results);
    }).catch((e) => {
      console.log(`Error: ${e}`);
    });
    return res;
  }

  static async find(data, threadId) {
    let condition;
    let response;
    if (data.q || data.sort) {
      condition = this.processRequest(data, threadId);
    } else {
      condition = ` && post_id = ${Object.values(data)}`;
    }
    await db.get('post', '*', condition).then((result) => {
      response = this.processData(result);
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    console.log(response);
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
        console.log('Error en catch model aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        console.error(`.catch(${e})`);
      });
      console.log(results);
      return results;
    }
    return 1;
  }

  async modify(postId) {
    let data;
    const condition = `post_id = ${postId}`;
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
    await db.del('post', condition).then((result) => {
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

  async deleteAll(condition) {
    await db.del('post', condition).then((result) => {
      this.result = result;
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return this.result;
  }
}
module.exports = PostMdl;
