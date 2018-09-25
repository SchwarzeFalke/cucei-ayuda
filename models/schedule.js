// Models for using the schedule class

const db = require('../db');

class Schedule {
  constructor(...args) {
    this.Id = args.Id;
    this.Clave = args.Clave;
    this.Materia = args.Materia;
    this.Sec = args.Sec;
    this.CR = args.CR;
    this.Hora = args.Hora;
    this.Dias = args.Dias;
    this.Edif = args.Edif;
    this.Aula = args.Aula;
    this.Profesor = args.Profesor;
  }

  save() {
    db.create(this);
  }
}

module.exports = Schedule;
