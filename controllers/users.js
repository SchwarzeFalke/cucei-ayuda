/**
 * @Author: schwarze_falke
 * @Date:   2018-09-20T09:59:17-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-21T22:01:25-05:00
 */

const db = require('../db');

class UserCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.insert = this.insert.bind(this);
    this.del = this.del.bind(this);
  }

  getAll(req, res) {
    this.users = db.getAll('users');
    const json = {
      response: 'Ok',
      data: this.users,
      total: 7,
    };
    res.send(json);
  }

  get(req, res) {
    this.user = db.get('users', 'stud_code', req.params.userId);
    const json = {
      response: 'Ok',
      data: this.user,
      total: 7,
    };
    res.send(json);
  }

  insert(req, res) {
    const values = 'stud_code, name, middle_name, flastname, mlastname, email, password';
    const postdata = req.body;
    this.response = db.insert('users', values, postdata);
    const json = {
      response: this.response,
    };
    res.send(json);
  }

  del(req, res) {
    this.user = db.del('users', 'stud_code', req.params.userId);
    const json = {
      response: 'Ok',
      data: this.user,
      total: 7,
    };
    res.send(json);
  }
}

module.exports = new UserCtrl();

/*
this.users = [
  {
    id: 1,
    name: 'Carlos',
    middleName: 'Adonis',
    lastName: 'Vara',
    email: 'autor.cvp303@gmail.com',
  },
  {
    id: 2,
    name: 'Joaquin',
    middleName: 'Loera',
    lastName: 'Santos',
    email: 'san_lojo@gmail.com',
  },
  {
    id: 3,
    name: 'Ana',
    middleName: 'Jimena',
    lastName: 'Sánchez',
    email: 'jimimi@hotmail.com',
  },
  {
    id: 4,
    name: 'Karla',
    middleName: 'Rocío',
    lastName: 'Saenz',
    email: 'le_kasaz@gmail.com',
  },
  {
    id: 5,
    name: 'Felipe',
    middleName: 'Gerardo',
    lastName: 'Pérez',
    email: 'gusi_guz03@gmail.com',
  },
  {
    id: 6,
    name: 'Angela',
    middleName: 'Cecilia',
    lastName: 'Fernández',
    email: 'ccff_angi@outlook.com',
  },
  {
    id: 7,
    name: 'Gustavo',
    middleName: 'Enrique',
    lastName: 'Giménez',
    email: 'chaco4567@gmail.com',
  },
];
*/
