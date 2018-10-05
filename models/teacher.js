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

  async modify(teachCode) {
    const condition = `teach_code = ${teachCode}`;
    const obj = {};
    obj.name = this.name;
    obj. = this.descript;
    await db.update('post', obj, condition).then((result) => {
      this.data = result;
    }).catch((e) => {
      console.error(`.catch(${e})`);
    });
    return this.data;
  }

  async delete(id) {
    try {
      this.result = await db.del('teacher', 'teach_code', id);
    } catch (e) {
      return 0;
    }
    if (this.result.affectedRows === 0) {
      return 0;
    }
    return 1;
  }
}
module.exports = TeacherMdl;
