const db = require('../db');

class buildingMdl{
  constructor({building_id, name, num_min_class, num_max_class, longitude, latitude}) {
    this.building_id = building_id;
    this.name = name;
    this.num_min_class = num_min_class;
    this.num_max_class = num_max_class;
    this.longitude = longitude;
    this.latitude = latitude;
  }

  static get validColumns(){
    const params = [
      'building_id',
      'name',
      'num_min_class',
      'num_max_class',
      'latitude',
      'longitude',
    ];
    return params;
  }

  static processResult(data) {
   this.result = [];
   data.forEach((res) => {
     this.result.push(new buildingMdl(res));
   });
   return this.result;
  }
  static checkUndefined(data) {
   this.result = [];
   this.forEach((dae) => {
     if (data !== undefined) {
       console.log(dae);
     }
   });
   return this.result;
  }

  static async validBuilding(id) {
      await db.get('building', 'building_id', `building_id = ${id}`)
        .then((results) => {
          this.result = results.length;
        })
        .catch(e => console.error(`.catch(${e})`));
        return this.result;
    return this.false;
  }

  static async seeQuery(data) {
    this.condition = '';
    if (data.q) {
      this.condition = ` && name = '${data.q}'`;
    }
    if (data.sort) {
      this.condition += ` ORDER BY name ${data.sort}`;
    }
    if (data.count) {
      this.condition += ` LIMIT ${data.count}`;
    } else {
      this.condition += ' LIMIT 15';
    }
    if (data.page) {
      this.condition += ` OFFSET ${data.page - 1} `;
    }
    return data;
  }

  static async getAll(condition) {
   await db.get('building', '*',  condition)
     .then((results) => {
       this.result = buildingMdl.processResult(results);
     }).catch((e) => {
       throw e;
     });
   return this.result;
  }

  static async get(columns, id, condition) {
    await db.get('building', columns, id)
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
   //console.log(buildingMdl.checkUndefined(this));
   const condition = `building_id = ${id}`;
   await db.update('building', this, condition)
     .then((results) => {
       this.result = results;
       return this.result;
     })
     .catch(e => console.error(`.catch(${e}})`));
   return this.result;
  }
}

module.exports = buildingMdl;
