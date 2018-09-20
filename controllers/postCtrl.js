class PostCtrl{
  constructor(){
    this.data = [
       {
         id: 111,
         text:'Como se agenda?',
         likes: 1,
         userId: 4575,
         published: 14/10/12,
       },
       {
         id: 111,
         text:'Como se agenda?',
         likes: 1,
         userId: 4575,
         publishedAt: 14/10/12,
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
    const json = {
      data:this.data,
      total_count: this.data.lenght,
      per_page:10,
      page:0,
    };
    res.send(json);
  }

  get(req, res) {
      const data = this.data.find(el => el.id === Number(req.params.postId));
      res.send(data);
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

}
module.exports = new PostCtrl();
