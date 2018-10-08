
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
    if (Object.keys(req.query).length > 0) {
      if (req.query.q === '') {
        res.status(400).send({ error: 'Letters not allow and numbers equal or below 0' });
      }
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
        let lower = req.query.sort
        lower = lower.toLowerCase();
        if (lower === 'asc' || lower === 'desc') {
        } else {
          res.status(400).send({ error: 'We just accept DESC or ASC' });
        }
      }
      next();
    } else {
      next();
    }
  }

  static noEmptyUpdate(req, res, next) {
    if (req.params.postId === '') {
      badRequestJSON.message = 'invalid topic id';
      res.status(400).send(badRequestJSON);
    } else {
      next();
    }
  }
}

module.exports = ForumMid;
