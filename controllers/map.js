/**
 * @Author: schwarze_falke
 * @Date:   2018-09-23T23:04:12-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-24T00:10:33-05:00
 */

const db = require('../db');

class MapCtrl {
  constructor() {
    this.get = this.getAll.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getClasses = this.getAll.bind(this);
  }

  getAll(req, res) {
    if (req.route.path === '/') {
      this.maps = db.getAll('map');
      const json = {
        response: 'Ok',
        data: this.maps,
        total: 7,
      };
      res.send(json);
    } else if (req.route.path === '/buildings') {
      this.buildings = db.getAll('buildings');
      const json = {
        response: 'Ok',
        data: this.buildings,
        total: 7,
      };
      res.send(json);
    } else if (req.route.path === '/routes') {
      this.routes = db.getAll('roads');
      const json = {
        response: 'Ok',
        data: this.routes,
        total: 7,
      };
      res.send(json);
    }
  }

  get(req, res) {
    if (req.route.path === '/:mapId') {
      this.map = db.get('map', 'map_code', req.params.mapId);
      const json = {
        response: 'Ok',
        data: this.map,
        total: 7,
      };
      res.send(json);
    } else if (req.route.path === '/:buildingId') {
      this.building = db.get('buildings', 'id', req.params.buildingId);
      const json = {
        response: 'Ok',
        data: this.building,
        total: 7,
      };
      res.send(json);
    } else if (req.route.path === '/:routeId') {
      this.route = db.get('roads', 'id', req.params.routeId);
      const json = {
        response: 'Ok',
        data: this.route,
        total: 7,
      };
      res.send(json);
    }
  }
}

module.exports = new MapCtrl();
