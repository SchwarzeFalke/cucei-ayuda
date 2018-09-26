/**
 * @Author: schwarze_falke
 * @Date:   2018-09-19T21:30:50-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-20T02:17:11-05:00
 */


/*
 * Definition of schedule routing
 */

const { Router } = require('express');

// const middleWares = require('../middlewares');

const router = Router();

/**
  * These are all the GET methods for the schedules.
  * GET /schedule
  * GET /schedule/:scheduleId
  * GET /schedule/:scheduleId/subjects
  */

// GET /schedule  Returns all schedules
router.get('/', (req, res) => {
  const schedules = [
    [
      {
        Id: 1212,
        Clave: 17607,
        Materia: 'Estructuras de Datos',
        Sec: 'D01',
        CR: 8,
        Hora: '1100-1255',
        Dias: 'L-M',
        Edif: 'DEDT',
        Aula: 'A014',
        Profesor: 'Jose',
      },
      {
        Id: 1262,
        Clave: 17609,
        Materia: 'Algoritimia',
        Sec: 'D05',
        CR: 8,
        Hora: '1100-1255',
        Dias: 'M-J',
        Edif: 'DEDX',
        Aula: 'A014',
        Profesor: 'Jose',
      },
    ],
  ];
  res.send(schedules);
});

// GET /schedule/:scheduleId    returns specific schedule
router.get('/:scheduleId', (req, res) => {
  const schedule = {
    scheduleId: req.params.scheduleId,
    schedule: [
      {
        Id: 1212,
        Clave: 17607,
        Materia: 'Estructuras de Datos',
        Sec: 'D01',
        CR: 8,
        Hora: '1100-1255',
        Dias: 'L-M',
        Edif: 'DEDT',
        Aula: 'A014',
        Profesor: 'Jose',
      },
      {
        Id: 1262,
        Clave: 17609,
        Materia: 'Algoritimia',
        Sec: 'D05',
        CR: 8,
        Hora: '1100-1255',
        Dias: 'M-J',
        Edif: 'DEDX',
        Aula: 'A014',
        Profesor: 'Jose',
      },
    ],
  };
  res.send(schedule);
});

// GET /schedule/:scheduleId/subjects
// Returns all subjects of a method
router.get('/:scheduleId/subjects', (req, res) => {
  const subjects = {
    id: req.params.scheduleId,
    subjects: [
      {
        Materia: 'Algoritmia',
        Hora: '1100-1255',
        Dias: 'M-J',
        Edif: 'DEDX',
        Aula: 'A014',
      },
      {
        Materia: 'Bases de Datos',
        Hora: '1100-1255',
        Dias: 'L-M',
        Edif: 'DEDX',
        Aula: 'A019',
      },
    ],
  };
  res.send(subjects);
});

// POST /schedule
router.post('/', (req, res) => {
  const schedule = [
    {
      Id: req.body.id1,
      Clave: req.body.clave1,
      Materia: req.body.materia1,
      Sec: req.body.sec1,
      CR: req.body.cr1,
      Hora: req.body.hora1,
      Dias: req.body.dias1,
      Edif: req.body.edif1,
      Aula: req.body.aula1,
      Profesor: req.body.profesor1,
    },
    {
      Id: req.body.id2,
      Clave: req.body.clave2,
      Materia: req.body.materia2,
      Sec: req.body.sec2,
      CR: req.body.cr2,
      Hora: req.body.hora2,
      Dias: req.body.dias2,
      Edif: req.body.edif2,
      Aula: req.body.aula3,
      Profesor: req.body.profesor2,
    },
  ];
  res.send(schedule);
});

// PUT /schedule/:scheduleId
router.put('/:scheduleId', (req, res) => {
  const schedule = {
    scheduleId: req.params.scheduleId,
    schedule: [
      {
        Id: req.body.id1,
        Clave: req.body.clave1,
        Materia: req.body.materia1,
        Sec: req.body.sec1,
        CR: req.body.cr1,
        Hora: req.body.hora1,
        Dias: req.body.dias1,
        Edif: req.body.edif1,
        Aula: req.body.aula1,
        Profesor: req.body.profesor1,
      },
      {
        Id: req.body.id2,
        Clave: req.body.clave2,
        Materia: req.body.materia2,
        Sec: req.body.sec2,
        CR: req.body.cr2,
        Hora: req.body.hora2,
        Dias: req.body.dias2,
        Edif: req.body.edif2,
        Aula: req.body.aula3,
        Profesor: req.body.profesor2,
      },
    ],
  };
  res.send(schedule);
});

// DELETE /schedule/:scheduleId
router.delete('/:scheduleId', (req, res) => {
  res.send(req.params.scheduleId);
});

module.exports = router;
