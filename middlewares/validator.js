// FIXME Los atributos usados para documentacion son en minusculas y de estos solo author es valido
/**
 * @author: schwarze_falke
 */

// FIXME Todos los metodos deben estar documentados

class Validator {
    static get badJSON() {
        return {
            status: 400, // FIXME el status code para un input incorrecto no es 40
            response: 'Bad Request',
            message: 'There is an invalid input in the request.',
            data: null,
        };
    }

    static get regex() {
        return {
            code: /^[1-9]+[0-9]*$/,
        };
    }

    static code(data) {
        if (!Validator.regex.code.test(data)) {
            return Validator.badJSON;
        }
        return false;
    }
}


module.exports = Validator;
