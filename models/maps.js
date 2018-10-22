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

    // Processes result sent by database
    static processResult(data) {
        this.result = [];
        data.forEach((res) => {
            this.result.push(new MapsMdl(res));
        });
        return this.result;
    }

    // request all data in table buildings
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
