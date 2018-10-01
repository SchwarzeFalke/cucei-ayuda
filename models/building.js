const db = require('../db');

class buildingMdl{
  constructor({building_id, name, num_class, longitude, latitude}) {
    this.building_id = building_id;
    this.name = name;
    this.num_class = num_class;
    this.longitude = longitude;
    this.latitude = latitude;
  }
  static processResult(data) {
   this.result = [];
   data.forEach((res) => {
     this.result.push(new buildingMdl(res));
   });
   return this.result;
  }
  static checkUndefined(data) {
   this.result = {};
   this.forEach((dae) => {
     if (data !== undefined) {
       console.log(ae);
     }
   });
   return this.result;
  }

  static async getAll() {
   await db.get('building', '*')
     .then((results) => {
       this.result = buildingMdl.processResult(results);
     })
     .catch(e => console.error(`.catch(${e})`));
   return this.result;
  }

  static async get(columns, condition) {
   await db.get('building', columns, condition)
     .then((results) => {
       this.result = results;
     })
     .catch(e => console.error(`.catch(${e})`));
   return this.result;
 }

 async save() {
  await db.insert('building', this)
    .then((results) => {
      this.result = results;
      return this.result;
    })
    .catch(e => console.error(`.catch(${e}})`));
  return this.result;
}

async update(id) {
 console.log(buildingMdl.checkUndefined(this));
 const condition = `building_id = ${id}`;
 await db.update('user', this, condition)
   .then((results) => {
     this.result = results;
     return this.result;
   })
   .catch(e => console.error(`.catch(${e}})`));
 return this.result;
}

}

module.exports = buildingMdl;
