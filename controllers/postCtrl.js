const db = require('../db')

class PostCtrl{
  constructor(){

    this.data = [
      {
        id: 1,
        text: 'fdasgdasgfag',
        by: 'juan1',
      },
      {
        id: 2,
        text: 'fdasgdasgfag2222',
        by: 'juan2',
      },
    ];
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);

    this.getAllComments = this.getAll.bind(this);
    this.getComments = this.getAll.bind(this);
    this.create = this.getAll.bind(this);
  }

  getAll(req,res){
    //this.posts = db.get('posts');
    const json = {
      data:this.data,
      total_count: this.data.lenght,
    };
    res.status(200).send(json);
  }

  get(req, res) {
      const data = this.data.find((element) => element.id == Number(req.params.postsId));

      if(data === undefined){
        //send error not found.
        console.log("damns");
      }
      res.status(200).send(data);
    }

  create(req,res){
    const lastId = this.data[this.data.lenght - 1].id;
    const data = {
      id: lastId + 1,
      text: req.body.text,
      publishedAt: req.body.date,
      userId: req.body.userId,
    };

    this.data.push(data);
    res.status(201).send(data);
  }
  modify(req,res){
    
  }
  delete(req,res){

  }

}
module.exports = new PostCtrl();
