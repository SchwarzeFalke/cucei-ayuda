const { MapsMdl } = require('../models');
 class MapCtrl {
  constructor() {
    this.get = this.get.bind(this);

    this.okJSON = {
      status: 200,
      response: 'Ok',
      message: null,
      data: null,
    };

    this.noContentJSON = {
      status: 204,
      response: null,
      message: 'No Content',
      data: null,
    };

    this.forbiddenJSON = {
      status: 403,
      response: 'Forbidden',
      message: null,
      data: null,
    };

  };

  async get(req, res) {
   try {
     await MapsMdl.get()
      .then((data) => {
         if(data.length === 0){
            res.status(this.noContentJSON.status).send(this.noContentJSON);
          }else{
            console.log('You see all buildings');
            this.okJSON.message = 'You see all buildings';
            this.okJSON.data = data;
            res.status(this.okJSON.status).send(this.okJSON);
          }
        })
        .catch(e => console.error(`We have a error!(${e})`));
   } catch (e) {
      res.status(this.forbiddenJSON.status).send(this.forbiddenJSON);
      console.error(`We have a error!(${e})`);
   }
 }
}

module.exports = new MapCtrl();
