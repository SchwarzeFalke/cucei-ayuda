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

  static async getAll() {
    let teachers = await db.getAll('teacher');
    teachers = this.processData(teachers);
    return teachers;
  }

  static async find(id) {
    let teacher = await db.get('teacher', 'id', id);
    teacher = this.processData(teacher);
    return teacher;
  }

  async save() {
    if (this.required()) {
      try {
        const result = await db.insertTh('teacher', this);
        console.log(result);
      } catch (e) {
        return e;
      }
    }
    return 'bad reques';
  }

  async delete(id) {
    this.result = await db.del('teacher', 'id', id);
  }
}
module.exports = TeacherMdl;
