
const { ResMdl } = require('../models');

class BuildingMdw {
    static validateLatitude(req, res, next) {
        const newResponse = new ResMdl();
        const test = /^\d+(\.\d+)$/;
        try {
            if (req.body.latitude === undefined) {
                next();
            }
            if (test.test(req.body.latitude)) {
                next();
            } else {
                newResponse.createResponse('Nothing to show', 400, '/building', 'GET');
                newResponse.response.message = newResponse.createMessage();
                this.response = newResponse;
                res.status(this.response.response.status).send(this.response.response);
            }
        } catch (e) {
            newResponse.response('There is nothing to retrieve', 500, e, 'GET');
            newResponse.response.message = newResponse.createMessage();
            this.response = newResponse;
            res.status(this.response.response.status).send(this.response.response);
        }
    }

    static validateLongitude(req, res, next) {
        const newResponse = new ResMdl();
        const test = /^\d+(\.\d+)$/;
        try {
            if (req.body.longitude === undefined) {
                next();
            }
            if (test.test(req.body.longitude)) {
                next();
            } else {
                newResponse.createResponse('Nothing to show', 400, '/building', 'GET');
                newResponse.response.message = newResponse.createMessage();
                this.response = newResponse;
                res.status(this.response.response.status).send(this.response.response);
            }
        } catch (e) {
            newResponse.response('There is nothing to retrieve', 500, e, 'GET');
            newResponse.response.message = newResponse.createMessage();
            this.response = newResponse;
            res.status(this.response.response.status).send(this.response.response);
        }
    }

    static validateNumClass(req, res, next) {
        const newResponse = new ResMdl();
        const test = /^\d+(\.\d+)$/;
        try {
            if (req.body.num_class === undefined) {
                next();
            }
            if (test.test(req.body.num_class)) {
                if (Number(req.body.num_class >= 1) || Number(req.body.num_class <= 35)) {
                    next();
                } else {
                    newResponse.createResponse('Nothing to show', 400, '/building', 'POST');
                }
            } else {
                newResponse.createResponse('Nothing to show', 400, '/building', 'POST');
            }
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

    static validateBuildingId(req, res, next) {
        const newResponse = new ResMdl();
        const test = /^\d+(\.\d+)$/;
        try {
            if (req.body.building_id === undefined) {
                next();
            }
            if (test.test(req.body.building_id)) {
                if (Number(req.body.building_id >= 1) || Number(req.body.building_id <= 40)) {
                    next();
                } else {
                    newResponse.createResponse('Nothing to show', 400, '/building', 'POST');
                }
            } else {
                newResponse.createResponse('Nothing to show', 400, '/building', 'POST');
            }
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
module.exports = BuildingMdw;
