'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const StudyContent = require('../models/study-content');
const ReviewContent = require('../models/review-content');
const ensurer = require('./authentication-ensurer');

router.get('/', ensurer.ensure, (req, res) => {
  StudyContent.findOne({
    include: [
      {
        model: StudyContent,
      }],
    where: {
      userId: req.session.userId
    }
  }).then((reviewContents) => {
    consele.log(reviewContents);
    res.render('review-contents', {reviewContents: reviewContents});
  })
});

router.post('/study/:userId/:studyContentsId', ensurer.ensure,
  //sessionIdとコンテンツのuserIdが同一か確認
  (req, res, next) => {
    const userId = req.params.userId;
    if (userId === req.session.userId){
      next();
    } else {
      const err = new Error('userIdが一致しません');
      err.status = 404;
      next(err);
    }
  },
  (req, res, next) => {
    
  }
);

module.exports = router;