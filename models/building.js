/**
 * @Author: schwarze_falke
 * @Date:   2018-10-07T20:34:36-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-07T22:16:29-05:00
 */

const db = require('../db');

class BuildingMdl {
  constructor(args) {
    this.building_id = args.building_id;
    this.name = args.name;
    this.num_class = args.num_class;
    this.longitude = args.longitude;
    this.latitude = args.latitude;
    this.exist = args.exist;
  }

  // colums valid in table buildings
  static get validColumns() {
    const params = [
      'building_id',
      'name',
      'num_class',
      'latitude',
      'longitude',
      'exist',
    ];
    return params;
  }

  // proccess result sent by database
  static processResult(data) {
    this.result = [];
    data.forEach((res) => {
      this.result.push(new BuildingMdl(res));
    });
    return this.result;
  }

  // valid if a specific id building exist
  static async validBuilding(id) {
    await db.get('building', 'building_id', `building_id = ${id}`)
      .then((results) => {
        this.result = results.length;
      })
      .catch(e => console.error(`We have a error!(${e})`));
    return this.result;
  }

  // request all data in table buildings
  static async getAll() {
    const condition = '';
    await db.get('building', '*', condition)
      .then((results) => {
        this.result = BuildingMdl.processResult(results);
      })
      .catch(e => console.error(`We have a error!(${e})`));
    return this.result;
  }

  // request a specific data building
  static async get(columns, id, condition) {
    let query = `building_id = ${id}`;
    if (condition) {
      query += condition;
    }
    await db.get('building', columns, query)
      .then((results) => {
        this.result = results;
      })
      .catch(e => console.error(`We have a error!(${e})`));
    return this.result;
  }

  // insert data a building in database
  async save() {
    console.log(this);
    await db.insert('building', this)
      .then((results) => {
        this.result = results;
        return this.result;
      })
      .catch(e => console.error(`We have a error!(${e})`));
    return this.result;
  }

  // modify a specific building in database
  async update(id) {
    const condition = `building_id = ${id}`;
    await db.update('building', this, condition)
      .then((results) => {
        this.result = results;
        return this.result;
      })
      .catch(e => console.error(`We have a error!(${e})`));
    return this.result;
  }

  // logic detele a specific building
  async logDel(id) {
    const condition = `building_id = ${id}`;
    await db.logDel('building', condition)
      .then((results) => {
        this.result = results;
        return this.result;
      })
      .catch(e => console.error(`We have a error!(${e})`));
    return this.result;
  }
}

module.exports = BuildingMdl;
