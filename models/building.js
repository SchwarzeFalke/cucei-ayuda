/**
 * @author: JulioMariscal
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

    /**
     * [result description: Returns all the valids columns for the building model]
     * @type {Array}
     */
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

    /**
     * [processResult description: Processes all the raw data and return the
     * requested data in a formatted way]
     * @param  {[type]} data [description: the returned data row from database]
     * @return {[type]}      [description: the formatted data]
     */
    static processResult(data) {
        this.result = [];
        data.forEach((res) => {
            this.result.push(new BuildingMdl(res));
        });
        return this.result;
    }

    /**
   * validBuilding find building_id using an building_id]
   * @param  {Int}  building_id [building_id to find a user]
   */
    static async validBuilding(id) {
        await db.get('building', 'building_id', `building_id = ${id}`)
            .then((results) => {
                this.result = results.length;
            })
            .catch(e => console.error(`We have a error!(${e})`));
        return this.result;
    }

    /**
     * [getAll description: Returns all building from database]
     * @param  {string}  condition
     * @return {Promise}           [description: Returns all the buildings]
     */
    static async getAll() {
        const condition = '';
        await db.get('building', '*', condition)
            .then((results) => {
                this.result = BuildingMdl.processResult(results);
            })
            .catch(e => console.error(`We have a error!(${e})`));
        return this.result;
    }

    /**
     * [get description: Returns an specific building from the database]
     * @param  {string}  columns   [description: Specifies which columns return]
     * @param  {[type]}  id        [description: Specifies the building ID]
     * @param  {string}  condition [description: Specifies a condition if it exists]
     * @return {Promise}           [description: Return the requested data]
     */
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

    /**
     * [save create data a building in database]
     * @return {Promise}
     */
    async save() {
        await db.insert('building', this)
            .then((results) => {
                this.result = results;
                return this.result;
            })
            .catch(e => console.error(`We have a error!(${e})`));
        return this.result;
    }

    /**
     * [update modify a specific building in database]
     * @param  {[type]}  id [description: Specifies the building ID]
     * @return {Promise}
     */
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

    /**
     * [logicalDel logic detele a specific building]
     * @param  {[type]}  id [description: Specifies the building ID]
     * @return {Promise}
     */
    async logicalDel(id) {
        const condition = `building_id = ${id}`;
        await db.logicalDel('building', condition)
            .then((results) => {
                this.result = results;
                return this.result;
            })
            .catch(e => console.error(`We have a error!(${e})`));
        return this.result;
    }
}

module.exports = BuildingMdl;
