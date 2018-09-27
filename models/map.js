const db = require('../db');

class Map {
  constructor(...args) {
    this.buildId = args.buildId;
    this.name = args.name;
    this.classrooms = args.classrooms;
    this.latitude = args.latitude;
    this.longitude = args.longitude;
  }

  save() {
    db.create(this);
  }

  get buildId(){
    return this.buildId;
  }
  get name(){
    return this.name;
  }
  get classrooms(){
    return this.classrooms;
  }
  get latitude(){
    return this.latitude;
  }
  get longitude(){
    return this.longitude;
  }

  set buildId(...args){
    this.buildId = args.buildId;
  }
  set name(...args){
    this.name = args.name;
  }
  set classrooms(...args){
    this.classrooms = args.classrooms;
  }
  set latitude(...args){
    this.latitude = args.latitude;
  }
  set longitude(...args){
    this.longitude = args.longitude;
  }
}

module.exports = Map;
