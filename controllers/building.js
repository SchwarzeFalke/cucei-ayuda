/**
 * @author: JulioMariscal
 */

const { BuildingMdl, ResMdl } = require('../models');

// FIXME Todos los metodos deben estar documentados
// FIXME En lugar de hacer los send de cada error, podria ser un next con error y
// tener un metodo manejador de errores
// FIXME Recomiendo manejar los promises con await y try-catch en lugar de then y catch

class BuildingCrtl {
    constructor() {
    // Binding class methods of the controller
        this.getAll = this.getAll.bind(this);
        this.getBuild = this.getBuild.bind(this);
        this.insert = this.insert.bind(this);
        this.modify = this.modify.bind(this);
        this.logDel = this.logDel.bind(this);
    }

    /**
     * [getAll description]
     * @param  {[type]}  req [description]
     * @param  {[type]}  res [description]
     * @return {Promise}     [description]
     */
    async getAll(req, res) {
        const newResponse = new ResMdl();
        try {
            await BuildingMdl.getAll()
                .then((data) => {
                    if (data.length === 0) {
                        newResponse.createResponse(data, 204, '/buildings', 'GET');
                    } else {
                        newResponse.createResponse(data, 200, '/buildings', 'GET');
                    }
                });
            newResponse.response.message = newResponse.createMessage();
            this.response = newResponse;
            res.status(this.response.response.status).send(this.response.response);
        } catch (e) {
            newResponse.response('There is nothing to retrieve', 500, e, 'GET');
            newResponse.response.message = newResponse.createMessage();
            this.response = newResponse;
            res.status(this.response.response.status).send(this.response.response);
        }
    }

    /**
     * [getBuild description]
     * @param  {[type]}  req [description]
     * @param  {[type]}  res [description]
     * @return {Promise}     [description]
     */
    async getBuild(req, res) {
        const newResponse = new ResMdl();
        try {
            await BuildingMdl.validBuilding(req.params.buildingId)
                .then((exists) => {
                    if (exists) {
                        BuildingMdl.get('*', req.params.buildingId)
                            .then((data) => {
                                if (data.length >= 1) {
                                    newResponse.createResponse(data, 200, '/buildings', 'GET');
                                } else {
                                    newResponse.createResponse(data, 204, '/buildings', 'GET');
                                }
                                newResponse.response.message = newResponse.createMessage();
                                this.response = newResponse;
                                res.status(this.response.response.status)
                                    .send(this.response.response);
                            });
                    } else {
                        newResponse.createResponse('Nothing to show', 404, '/building', 'GET');
                        newResponse.response.message = newResponse.createMessage();
                        this.response = newResponse;
                        res.status(this.response.response.status).send(this.response.response);
                    }
                });
        } catch (e) {
            newResponse.response('There is nothing to retrieve', 500, e, 'GET');
            newResponse.response.message = newResponse.createMessage();
            this.response = newResponse;
            res.status(this.response.response.status).send(this.response.response);
        }
    }

    /**
     * [insert description]
     * @param  {[type]}  req [description]
     * @param  {[type]}  res [description]
     * @return {Promise}     [description]
     */
    async insert(req, res) {
        const newResponse = new ResMdl();
        const newBuilding = new BuildingMdl({ ...req.body });
        try {
            await BuildingMdl.validBuilding(req.body.building_id)
                .then((exists) => {
                    if (!exists) {
                        newBuilding.save()
                            .then((data) => {
                                newResponse.createResponse(data, 200, '/buildings', 'GET');
                            });
                    } else {
                        newResponse.createResponse('Nothing to show', 400, '/buildings', 'GET');
                    }
                });
            newResponse.response.message = newResponse.createMessage();
            this.response = newResponse;
            res.status(this.response.response.status).send(this.response.response);
        } catch (e) {
            newResponse.response('There is nothing to retrieve', 500, e, 'GET');
            newResponse.response.message = newResponse.createMessage();
            this.response = newResponse;
            res.status(this.response.response.status).send(this.response.response);
        }
    }

    /**
     * [modify description]
     * @param  {[type]}  req [description]
     * @param  {[type]}  res [description]
     * @return {Promise}     [description]
     */
    async modify(req, res) {
        const newResponse = new ResMdl();
        const modifyBuilding = new BuildingMdl({ ...req.body });
        try {
            await BuildingMdl.validBuilding(req.params.buildingId)
                .then((exists) => {
                    if (exists) {
                        modifyBuilding.update(req.params.buildingId)
                            .then((data) => {
                                newResponse.createResponse(data, 200, '/buildings', 'GET');
                            });
                    } else {
                        newResponse.createResponse('Nothing to show', 404, '/buildings', 'GET');
                    }
                });
            newResponse.response.message = newResponse.createMessage();
            this.response = newResponse;
            res.status(this.response.response.status).send(this.response.response);
        } catch (e) {
            newResponse.response('There is nothing to retrieve', 500, e, 'GET');
            newResponse.response.message = newResponse.createMessage();
            this.response = newResponse;
            res.status(this.response.response.status).send(this.response.response);
        }
    }

    /**
     * [logDel description]
     * @param  {[type]}  req [description]
     * @param  {[type]}  res [description]
     * @return {Promise}     [description]
    */
    async logDel(req, res) {
        const newResponse = new ResMdl();
        const updateBuilding = new BuildingMdl({ ...req.body });
        try {
            await BuildingMdl.validBuilding(req.params.buildingId)
                .then((exists) => {
                    if (exists) {
                        updateBuilding.logicalDel(req.params.buildingId)
                            .then((data) => {
                                newResponse.createResponse(data, 200, '/buildings', 'GET');
                            });
                    } else {
                        newResponse.createResponse('Nothing to show', 404, '/buildings', 'GET');
                    }
                });
            newResponse.response.message = newResponse.createMessage();
            this.response = newResponse;
            res.status(this.response.response.status).send(this.response.response);
        } catch (e) {
            newResponse.response('There is nothing to retrieve', 500, e, 'GET');
            newResponse.response.message = newResponse.createMessage();
            this.response = newResponse;
            res.status(this.response.response.status).send(this.response.response);
        }
    }
}
module.exports = new BuildingCrtl();
