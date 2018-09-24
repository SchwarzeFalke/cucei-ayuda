const db = require('../db')

class Thread {
  constructor(...args) {
    this.id = args.id;
    this.subject = args.subject;
    this.createdAt = args.subject;
    this.user_id = args.user_id;
    this.topic_id = args.topic_id;

    this.all.bind(this);
    this.create.bind(this);
  }

  required() {
    return (this.id !== undefined && this.subject !== undefined &&
     this.createdAt !== undefined && this.user_id !== undefined && this.topic_id
     !== undefined)
  }

  all() {
    return db.getAll('threads');
  }

  find(id) {
    return db.get('threads','id',id);
  }

  save() {
    if(required()) {
      return db.create('threads',this);
    }
  }
  //create();
  delete(id) {
    return db.del('threads','id',id);
  }

}
