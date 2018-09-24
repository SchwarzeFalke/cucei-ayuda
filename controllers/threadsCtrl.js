const db = require('../db')
// const thread = require('../models');

class ThreadCtrl {
  constructor() {

    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.modify = this.modify.bind(this);
    this.delete = this.delete.bind(this);

    // this.getAllComents = this.getAllComents.bind(this);
    // this.getComment = this.get.bind(this);
    // this.createComment = this.createComment.bind(this);
    // this.modifyComment = this.modifyComment.bind(this);
    // this.deleteComment = this.deleteComment.bind(this);
  }

  getAll(req, res) {
    db.getAll('threads', (err, data) => {
      res.send(data);
    });
  }

  get(req, res) {
    const data = this.data.find(element => element.id === Number(req.params.postsId));

    if (data === undefined) {
      res.status(400).json({
        ok:false,
        menssage: 'Id doesn´t exist',
      });
    }
    res.send(data);
  }

  create(req, res) {
    this.response = thread.create();
    const data = {
      subject: req.body.text,
      created: req.body.date,
      user_id: req.body.userId,
      topic_id: req.body.topicId,
    };
    res.status(201).send(data);
  }

  modify(req, res) {
    const data = this.data.find(element => element.id === Number(req.params.postsId));
    if (data === undefined) {
      // send error not found.
      console.log('damns');
    }
    res.send(data)
  }

  delete(req, res) {}

  getAllPosts(req, res) {
    const { threadId } = req.params;
    this.posts = db.get('posts', 'threadId', threadId)
    const json = {
      data: this.post,
      total_count: this.post.lenght,
    };
    res.status(200).send(json);
  }

  getPost(req, res) {
    const { postId } = req.params;
    this.post = db.get('posts','postId', postId);
    res.status(200).send(this.post);
  }
  createPost(){

  }
  //   this.modifyComment = this.modifyComment.bind(this);
  // this.deleteComment = this.deleteComment.bind(this);

}
module.exports = new ThreadCtrl();
