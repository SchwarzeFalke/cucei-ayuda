const { BuildingMdl } = require('../models');
class BuildingCrtl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.getBuild = this.getBuild.bind(this);
    this.getClasses = this.getClasses.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);

    this.okJSON = {
      status: 200,
      response: 'Ok',
      message: null,
      data: null,
    };

    this.createJSON = {
      status: 201,
      response: null,
      message: 'Building successfully',
      data: null,
    };

    this.noContentJSON = {
      status: 204,
      response: null,
      message: 'No Content',
      data: null,
    };

    this.badRequestJSON = {
      status: 400,
      response: null,
      message: 'Bad request',
      data: null,
    };

    this.forbiddenJSON = {
      status: 403,
      response: 'Forbidden',
      message: null,
      data: null,
    };

    this.notFoundJSON = {
      status: 404,
      response: null,
      message: 'Not found',
      data: null,
    };

  }

  async getAll(req, res) {
   try {
     await buildingMdl.getAll()
       .then((data) => {
         this.okJSON.data = data; // data field is set
         res.status(this.okJSON.status).send(this.oktJSON);
       })
       .catch(e => console.error(`.catch(${e}})`));
   } catch (e) {
     console.error(`try/catch(${e})`);
     res.status(this.noContentJSON.status).send(this.noContentJSON);
   }
 }
 async getBuild(req, res) {
    try {
      const condition = `building_id = ${req.params.building_id}`;
      await BuildingCrtl.get('*', condition)
        .then((data) => {
          this.okJSON.data = data;
          res.status(this.okJSON.status).send(this.okJSON);
        })
        .catch(e => console.error(`.catch(${e})`));
    } catch (e) {
      console.error(`try/catch(${e})`);
      res.status(this.noContentJSON.status).send(this.noContentJSON);
    }
  }
  async getClasses(req, res) {
     try {
       const condition = `building_id = ${req.params.building_id}`;
       await BuildingCrtl.get('*', condition)
         .then((data) => {
           console.log(data);
           this.okJSON.data = data;
           res.status(this.okJSON.status).send(this.okJSON);
         })
         .catch(e => console.error(`.catch(${e})`));
     } catch (e) {
       console.error(`try/catch(${e})`);
       res.status(this.noContentJSON.status).send(this.noContentJSON);
     }
   }
   async insert(req, res) {
    const newBuilding = new BuildingCrtl({ ...req.body });
    try {
      await newBuilding.save()
        .then((data) => {
          this.info = data;
          this.createJSON.response = 'Created';
          this.createJSON.message += ' created into database';
          this.createJSON.data = newBuilding;
          res.status(this.createJSON.status).send(this.createJSON);
        })
        .catch(e => console.error(`.catch(${e})`));
    } catch (e) {
      console.error(`try/catch(${e})`);
      res.status(this.badRequestJSON.status).send(this.badRequestJSON);
    }
  }
  async update(req, res) {
   const updateBuilding = new BuildingMdl({ ...req.body });
   try {
     await updateBuilding.update(req.params.building_id)
       .then((data) => {
         this.okJSON.response = 'Updated';
         this.okJSON.message += ' updated from database';
         this.okJSON.data = data;
         res.status(this.okJSON.status).send(this.okJSON);
       })
       .catch(e => console.error(`.catch(${e})`));
   } catch (e) {
     console.error(`try/catch(${e})`);
     res.status(this.badRequestJSON.status).send(this.badRequestJSON);
   }
 }
}

module.exports =  new BuildingCrtl();
