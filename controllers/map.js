/**
 * @author: JulioMariscal
 */

const { MapsMdl, ResMdl } = require('../models');

// FIXME Todos los metodos deben estar documentados
// FIXME En lugar de hacer los send de cada error, podria ser un next con error
// y tener un metodo manejador de errores
// FIXME Recomiendo manejar los promises con await y try-catch en lugar de then y catch

class MapCtrl {
    constructor() {
    // Binding class methods of the controller
        this.get = this.get.bind(this);
    }

    /**
     * [GET Returns all the data from database via map model]
     * @param  {[type]}  req
     * @param  {[type]}  res
     * @return {Promise}
     */
    async get(req, res) {
        const newResponse = new ResMdl();
        try {
            await MapsMdl.get(req.query)
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
}

module.exports = new MapCtrl();
