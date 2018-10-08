
const badRequestJSON = {
  status: 400,
  response: 'Bad request',
  message: null,
  data: null,
};

class ForumMid {
  static validateNumberParams(req, res, next) {
    if (req.params.topicId <= 0 || !(/^\d+$/.test(req.params.topicId))) {
      badRequestJSON.message = 'invalid topic id';
      res.status(400).send(badRequestJSON);
    } else {
      next();
    }
  }

  static validateNumberParamsThread(err, req, res, next) {
    if (req.params.threadId <= 0 || !(/^\d+$/.test(req.params.threadId))) {
      badRequestJSON.message = 'invalid thread id';
      res.status(400).send(badRequestJSON);
    } else {
      next();
    }
  }

  static validateNumberParamsPost(req, res, next) {
    if (req.params.postId <= 0 || !(/^\d+$/.test(req.params.postId))) {
      badRequestJSON.message = 'invalid post id';
      res.status(400).send(badRequestJSON);
    } else {
      next();
    }
  }

  static noEmptyPostTopic(req, res, next) {
    const empty = 0;
    for (var i in req.body){
      if (i === 'name' && req.body[i] === '') {
        empty = 1;
      }
      if (i === 'descript' && req.body[i] === '') {
        empty = 1;
      }
      if (i === 'exist' && req.body[i] === '') {
        empty = 1;
      }
    }
    if (empty > 0) {
      res.status(400).send({ error: 'dejaste un campo vacio' });
    } else {
      next();
    }
  }

  static noEmptyPostThread(req, res, next) {
    const empty = 0;
    for (var i in req.body){
      if (i === 'subject' && req.body[i] === '') {
        empty = 1;
      }
      if (i === 'stud_code' && req.body[i] === '') {
        empty = 1;
      }
      if (i === 'exist' && req.body[i] === '') {
        empty = 1;
      }
    }
    if (empty > 0) {
      res.status(400).send({ error: 'dejaste un campo vacio' });
    } else {
      next();
    }
  }

  static noEmptyPost(req, res, next) {
    const empty = 0;
    for (var i in req.body){
      if (i === 'content' && req.body[i] === '') {
        empty = 1;
      }
      if (i === 'exist' && req.body[i] === '') {
        empty = 1;
      }
      if (i === 'stud_code' && req.body[i] === '') {
        empty = 1;
      }
    }
    if (empty > 0) {
      res.status(400).send({ error: 'dejaste un campo vacio' });
    } else {
      next();
    }
  }

  static noEmptySearch(req, res, next) {
    if (req.query.length) {
      if (req.query.count) {
        if (req.query.count <= 0 || !(/^\d+$/.test(req.query.count))) {
          res.status(400).send({ error: 'Letters not allow and numbers equal or below 0' });
        }
      }
      if (req.query.page) {
        if (req.query.page <= 0 || !(/^\d+$/.test(req.query.page))) {
          res.status(400).send({ error: 'Letters not allow and numbers equal or below 0' });
        }
      }
      if (req.query.sort) {
        if (req.query.sort !== 'ASC' || req.query.sort !== 'DESC') {
          res.status(400).send({ error: 'We just accept DESC or ASC' });
        }
      }
    } else {
      next();
    }
  }
}

module.exports = ForumMid;
