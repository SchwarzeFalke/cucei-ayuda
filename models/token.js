/**
 * @Author: schwarze_falke
 * @Date:   2018-10-11T09:26:08-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-11T09:26:09-05:00
 */
class Token {
  constructor (args) {
    this.token = token;
  }

  async get(token){
    let query = `token = ${token} && status = 1`;
    await db.get('tokens', '*', query)
    .then((results){
      this.result = results;
    })
    .cacht(e => console.error(`.catch(${e})`));
    return this.result;
  }


}
