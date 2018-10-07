// Models for using the schedule class

const db = require('../db');

class Schedule {
  constructor(args) {
    this.nrc = args.nrc;
    this.name = args.name;
    this.first_day = args.first_day;
    this.sec_day = args.sec_day;
    this.classroom = args.classroom;
    this.section = args.section;
    this.credits = args.credits;
    this.building = args.building;
    this.exist = '1';
    this.taught_by = args.taught_by;
  }

  static processResult(data) {
    this.result = [];
    data.forEach((res) => {
      this.result.push(new Schedule(res));
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

  static async validSchedule(nrc) {
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

  static async getAll(condition, order) {
    await db.get('subject', '*', condition, order)
      .then((results) => {
        this.result = Schedule.processResult(results);
      })
      .catch((e) => {
        throw e;
      });
    return this.result;
  }

  static async get(columns, condition, order) {
    await db.get('subject', columns, condition, order)
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
}

module.exports = Schedule;
