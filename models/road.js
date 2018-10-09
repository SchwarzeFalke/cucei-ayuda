/**
 * @Author: schwarze_falke
 * @Date:   2018-10-09T02:37:14-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-09T03:55:52-05:00
 */

const db = require('../db'); // for database handling

class RoadMdl {
  static async getBuildings(column, condition) {
    return new Promise(async (resolve, reject) => {
      this.information = [];
      await db.get('subject_lists', column, condition)
        .then(async (results) => {
          for (const data of results) {
            this.information.push(await db.get('subject', '*', `nrc = ${data.subject_id}`));
          }
          return resolve(this.information);
        })
        .catch(e => reject(e));
    });
  }

  static async getRoad(data) {
    return new Promise(async (resolve, reject) => {
      this.information = [];
      for(const bld of data) {
        await db.get('building', 'latitude, longitude', `building_id = ${bld[0].building}`)
          .then((result) => {
            this.information.push(result);
          })
          .catch(e => reject(e));
      }
      return resolve(this.information);
    });
  }
}

module.exports = RoadMdl;
