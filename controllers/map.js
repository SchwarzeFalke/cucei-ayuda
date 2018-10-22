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

    /* Valida que el promise regrese datos, en tal caso manda una respuesta
     * 200(Ok), en caso de que la respuesta del promise no regrese nada
     * se dara una respuesta 204(No content)
     */
    async get(req, res) {
        const newResponse = new ResMdl();
        try {
            await MapsMdl.get()
                .then((data) => {
                    if (data.length > 1) {
                        newResponse.createResponse(data, 200, '/buildings', '/GET');
                    } else {
                        newResponse.createResponse(data, 204, '/buildings', '/GET');
                    }
                });
        } catch (e) {
            newResponse.response('There is nothing to retrieve', 500, e, 'GET');
            newResponse.response.message = newResponse.createMessage();
            this.response = newResponse;
            res.status(this.response.response.status).send(this.response.response);
        }
    }
}

module.exports = new MapCtrl();
