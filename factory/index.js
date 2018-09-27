/**
 * @Author: schwarze_falke
 * @Date:   2018-09-20T09:45:40-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-27T03:09:22-05:00
 */
const faker = require('faker');

const models = require('../models');

class Factory {
  constructor() {
    this.fakeUsers = this.fakeUsers.bind(this);
    faker.setLocale('es_MX');
  }

  fakeUsers(amount) {
    for (let i = 0; i < amount; i += 1) {
      this.data = {
        stud_code: faker.random.number(),
        name: faker.name.findName(),
        middle_name: faker.name.findName(),
        flastname: faker.name.lastname(),
        mlastname: faker.name.lastname(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        exist: 1,
      };
      new models.UserMdl(this.data).save();
    }
  }
}

module.exports = new Factory();
