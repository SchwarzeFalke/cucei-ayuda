const db = require('../db');

class TeacherMdl {
  constructor({ teach_code, name, middle_name, flastname, mlastname, email, total_rate, exist }) {
    this.teach_code = teach_code;
    this.name = name;
    this.middle_name = middle_name;
    this.flastname = flastname;
    this.mlastname = mlastname;
    this.email = email;
    this.total_rate = total_rate;
    this.exist = exist;
  }

  static required() {
    return (this.name !== undefined
    && this.middle_name !== undefined && this.flastname !== undefined
    && this.mlastname !== undefined && this.email !== undefined
    && this.total_rate !== undefined && this.exist !== undefined);
  }

  static processData(data) {
    const results = [];
    data.forEach((res) => {
      results.push(new TeacherMdl(res));
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
    delete this.teach_code;
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

  async modify(teachCode) {
    delete this.teach_code;
    const condition = `teach_code = ${teachCode}`;
    await db.update('post', this, condition).then((result) => {
      this.data = result;
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return this.data;
  }

  async delete(id) {
    const condition = `teach_id = ${id}`;
    await db.del('teacher', condition).then((result) => {
      this.result = result;
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return this.result;
  }
}
module.exports = TeacherMdl;
