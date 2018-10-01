const db = require('../db');

class Map {
   constructor({building_id, name, num_class, longitude, latitude}) {
     this.building_id = building_id;
     this.name = name;
     this.num_class = num_class;
     this.longitude = longitude;
     this.latitude = latitude;
   }
   static async getAll(){
     const data = await db.selectAll('building', '*');
     const response = [];
     data.forEach((row) => {
       response.push(new Map(row0));
     });
     return response;
   }
   static async getAll() {
    await db.get('user', '*')
      .then((results) => {
        this.result = UserMdl.processResult(results);
      })
      .catch(e => console.error(`.catch(${e})`));
    return this.result;
  }
}
