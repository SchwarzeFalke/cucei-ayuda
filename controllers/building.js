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
     await BuildingMdl.getAll(req.query)
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
       .catch((e) => { throw e });
   } catch (e) {
      res.status(this.notFoundJSON.status).send(this.notFoundJSON);
      console.error(`We have a error!(${e})`);
   }
 }




 async getBuild(req, res) {
    try {
      await BuildingMdl.validBuilding(req.params.buildingId)
      .then((exists) => {
        if(exists) {
           let Search = `building_id = ${req.params.buildingId}`;
          BuildingMdl.get('*', Search, req.query)
          .then((data) => {
            console.log(`You see building with id: ${req.params.buildingId}`);
            this.okJSON.data = data;
            res.status(this.okJSON.status).send(this.okJSON);
          })
          .catch((e) => { throw e });
        }else {
          this.notFoundJSON.message = 'The requested building cannot be found';
          res.status(this.notFoundJSON.status).send(this.notFoundJSON);
        }
      })
      .catch((e) => { throw e });
    } catch (e) {
      console.error(`We have a error!(${e})`);
      res.status(this.noContentJSON.status).send(this.noContentJSON);
    }
  }

  async getClasses(req, res) {
     try {
       await BuildingMdl.validBuilding(req.params.buildingId)
       .then((exists) => {
         if(exists) {
           let Search = `building_id = ${req.params.buildingId}`;
           const condition = `building_id = ${req.params.buildingId}`;
           BuildingMdl.get('num_max_class', Search, condition)
             .then((data) => {
               console.log(data);
               this.okJSON.data = data;
               res.status(this.okJSON.status).send(this.okJSON);
             })
             .catch(e => console.error(`.catch(${e})`));
         }
       })
       .catch(e => console.error(`.catch(${e})`));
     } catch (e) {
       res.status(this.noContentJSON.status).send(this.noContentJSON);
       console.error(`We have a error!(${e})`);
     }
   }

   async insert(req, res) {
     const newBuilding = new BuildingMdl({ ...req.body });
     try {
       await BuildingMdl.validBuilding(req.body.building_id)
       .then((exists) => {
         if(!exists) {
           newBuilding.save()
           .then((data) => {
               console.log(`Crated new building: ${req.body.building_id}`);
               this.info = data;
               this.createJSON.response = 'Created';
               this.createJSON.message = 'Created new building';
               this.createJSON.data = newBuilding;
               res.status(this.createJSON.status).send(this.createJSON);
             })
             .catch(e => console.error(`.catch(${e})`));
          }else {
            console.log('This id buildingId used');
            this.badRequestJSON.message = 'Created new building';
            res.status(this.badRequestJSON.status).send(this.badRequestJSON);
          }
        })
        .catch(e => console.error(`.catch(${e})`));
    } catch (e) {
      console.error(`We have a error!(${e})`);
      res.status(this.badRequestJSON.status).send(this.badRequestJSON);
    }
  }

  async update(req, res) {
   const updateBuilding = new BuildingMdl({ ...req.body });
   try {
     await BuildingMdl.validBuilding(req.params.buildingId)
     .then((exists) => {
       if(exists) {
         console.log(req.params.buildingId);
         updateBuilding.update(req.params.buildingId)
           .then((data) => {
             this.okJSON.response = 'Updated';
             this.okJSON.message = 'You update a building';
             this.okJSON.data = data;
             res.status(this.okJSON.status).send(this.okJSON);
           })
           .catch(e => console.error(`.catch(${e})`));
       }else {
         this.okJSON.message = ' updated from database';
         res.status(this.okJSON.status).send(this.okJSON);
       }
     })
     .catch(e => console.error(`.catch(${e})`));
   } catch (e) {
     console.error(`We have a error!(${e})`);
     res.status(this.badRequestJSON.status).send(this.badRequestJSON);
   }
 }
}

module.exports =  new BuildingCrtl();
