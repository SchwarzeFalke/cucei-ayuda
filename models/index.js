/**
 * @Author: schwarze_falke
 * @Date:   2018-09-21T19:37:53-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-21T19:39:30-05:00
 */
const ThreadMdl = require('./thread');
const TopicMdl = require('./topic');
const PostMdl = require('./post');
const UserMdl = require('./user');
const Schedule = require('./schedule');

module.exports = {
  UserMdl, Schedule, ThreadMdl, TopicMdl, PostMdl
};

