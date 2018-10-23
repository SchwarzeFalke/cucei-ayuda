/**
 * @author: JulioMariscal
 */
const db = require('../db');

class MapsMdl {
    constructor({
        buildingId, name, numClass, longitude, latitude, exist,
    }) {
        this.building_id = buildingId;
        this.name = name;
        this.num_class = numClass;
        this.longitude = longitude;
        this.latitude = latitude;
        this.exist = exist;
    }

    /**
     * [processResult description]
     * @param  {[type]} data [description: the returned data row from database]
     * @return {[type]}      [description: the formatted data]
     */
    static processResult(data) {
        this.result = [];
        data.forEach((res) => {
            this.result.push(new MapsMdl(res));
        });
        return this.result;
    }

    /**
     * [get description: Returns all buildings from database]
     * @return {Promise} [description: Returns all the buildings]
     */
    static async get() {
        const condition = '';
        await db.get('building', '*', condition)
            .then((results) => {
                this.result = MapsMdl.processResult(results);
            })
            .catch(e => console.error(`.catch(${e})`));
        return this.result;
    }
}
module.exports = MapsMdl;
