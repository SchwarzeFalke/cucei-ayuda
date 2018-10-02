const db = require('../db');

class TeacherMdl {
  constructor({ name, middle_name, flastname, mlastname, email, total_rate, exist }) {
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

  static async getAll(id) {
    await db.get('user', '*')
      .then((results) => {
        this.result = this.processResult(results);
      })
      .catch(e => console.error(`.catch(${e})`));
    return this.result;
    // try {
    //   this.teacher = await db.find('teacher', 'teach_code', id);
    // } catch (e) {
    //   console.log(e);
    // }
    // this.teachers = this.processData(this.teachers);
    // return this.teachers;
  }

  static async find(id) {
    try {
      this.teacher = await db.find('teacher', 'teach_code', id);
    } catch (e) {
      console.log(e);
      return e;
    }
    const teacher = this.processData(this.teacher);
    return teacher;
  }

  async save(threadId) {
    this.thread_id = Number(threadId);
    delete this.teacher_id;
    if (this.required()) {
      try {
        this.result = await db.insert('teacher', this);
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
    const condition = `teacher_id = ${this.teacher_id}`;
    const obj = {};
    obj.content = this.content;
    //obj.created = this.created;
    console.log(obj);
    try {
      this.data = await db.update('teacher', obj, condition);
    } catch (e) {
      console.log(e);
    }
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
