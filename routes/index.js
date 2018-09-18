
const { Router } = require('express');

const bodyParser = require('body-parser');

const forumRouter = require('./forum');

const router = Router();


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req,res)=> res.send('hi'));

router.use('/forum', forumRouter);
module.exports = router;
