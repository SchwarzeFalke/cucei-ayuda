/**
 * @Author: schwarze_falke
 * @Date:   2018-10-07T13:20:58-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-11T01:11:56-05:00
 */

// Models for using the Subject class

const db = require('../db');

class Subject {
  constructor(args) {
    if (args.nrc !== undefined) this.nrc = args.nrc;
    if (args.name !== undefined) this.name = args.name;
    if (args.first_day !== undefined) this.first_day = args.first_day;
    if (args.sec_day !== undefined) this.sec_day = args.sec_day;
    if (args.classroom !== undefined) this.classroom = args.classroom;
    if (args.section !== undefined) this.section = args.section;
    if (args.credits !== undefined) this.credits = args.credits;
    if (args.building !== undefined) this.building = args.building;
    if (args.exist !== undefined) this.exist = '1';
    if (args.taught_by !== undefined) this.taught_by = args.taught_by;
  }

  static processResult(data) {
    this.result = [];
    data.forEach((res) => {
      this.result.push(new Subject(res));
    });
    return this.result;
  }

  static checkUndefined(data) {
    this.result = {};
    data.forEach((dat) => {
      if (dat !== undefined) {
        console.log(dat);
      }
    });
    return this.result;
  }

  static async validSubject(nrc) {
    await db.get('subject', 'nrc', `nrc = ${nrc}`)
      .then((results) => {
        this.result = results.length;
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(this.result);
    return this.result;
  }

  static async getAll() {
    await db.get('subject', ['nrc', 'name', 'first_day', 'sec_day', 'classroom', 'section', 'credits', 'building', 'taught_by'])
      .then((results) => {
        this.result = Subject.processResult(results);
      })
      .catch((e) => {
        throw e;
      });
    return this.result;
  }

  static async get(columns, condition) {
    await db.get('subject', columns, condition)
      .then((results) => {
        this.result = results;
      })
      .catch((e) => {
        throw e;
      });
    return this.result;
  }

  static async del(condition) {
    await db.logicalDel('subject', condition)
      .then((results) => {
        this.result = results;
      })
      .catch((e) => {
        throw e;
      });
    return this.result;
  }

  async save() {
    await db.insert('subject', this)
      .then((results) => {
        this.result = results;
        return this.result;
      })
      .catch((e) => {
        throw e;
      });
    return this.result;
  }

  async update(nrc) {
    const condition = `nrc = ${nrc}`;
    await db.update('subject', this, condition)
      .then((results) => {
        this.result = results;
        return this.result;
      })
      .catch((e) => {
        throw e;
      });
    return this.result;
  }

  static async createRelation(userId, nrc) {
    if (await Subject.validSubject(nrc)) {
      const newId = `${userId}${nrc}`;
      const SubjectItem = {
        id: newId,
        exist: 1,
        subject_id: nrc,
        stud_id: userId,
      };
      console.log(SubjectItem);
      await db.insert('subject_lists', SubjectItem)
        .then((results) => {
          this.result = results;
          console.log(results);
          return SubjectItem;
        })
        .catch((e) => {
          throw e;
        });
    }
  }
}

module.exports = Subject;
