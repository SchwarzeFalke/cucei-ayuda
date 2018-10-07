const db = require('../db');

class buildingMdl{
  constructor({building_id, name, num_class, longitude, latitude, exist}) {
    this.building_id = building_id;
    this.name = name;
    this.num_class = num_class;
    this.longitude = longitude;
    this.latitude = latitude;
    this.exist = exist;
  }

  //colums valid in table buildings
  static get validColumns(){
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

  //proccess result sent by database
  static processResult(data) {
   this.result = [];
   data.forEach((res) => {
     this.result.push(new buildingMdl(res));
   });
   return this.result;
  }

  //valid if a specific id building exist
  static async validBuilding(id) {
      await db.get('building', 'building_id', `building_id = ${id}`)
        .then((results) => {
          this.result = results.length;
        })
        .catch(e => console.error(`We have a error!(${e})`));
        return this.result;
    return this.false;
  }

  //request all data in table buildings
  static async getAll() {
    let condition = '';
    await db.get('building', '*',  condition)
      .then((results) => {
        this.result = buildingMdl.processResult(results);
     })
     .catch(e => console.error(`We have a error!(${e})`));
     return this.result;
  }

  //request a specific data building
  static async get(columns, id, condition) {
    await db.get('building', columns, id)
    .then((results) => {
        this.result = results;
    })
    .catch(e => console.error(`We have a error!(${e})`));
    return this.result;
  }

  //insert data a building in database
  async save() {
    await db.insert('building', this)
    .then((results) => {
      this.result = results;
      return this.result;
    })
    .catch(e => console.error(`We have a error!(${e})`));
    return this.result;
  }

  //modify a specific building in database
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

  //logic detele a specific building
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

module.exports = buildingMdl;
