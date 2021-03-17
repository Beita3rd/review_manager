'use strict';
const express = require('express');
const router = express.Router();
const loader = require('../models/sequelize-loader');
const sequelize = loader.database;
const User = require('../models/user');
const StudyContent = require('../models/study-content');
const ReviewContent = require('../models/review-content');
const ensurer = require('./authentication-ensurer');

router.get('/', ensurer.ensure, (req, res) => {
  const today = new Date();
  sequelize.query
  ("SELECT * FROM review_contents JOIN study_contents ON review_contents.study_contents_id = study_contents.study_contents_id WHERE user_id = ? AND review_date = ?",
  { replacements: [req.session.userId, today], type: sequelize.QueryTypes.SELECT }
  ).then(reviewContents => {
    console.log(reviewContents);
    res.render('review-contents', {reviewContents: reviewContents});
  });
});

router.post('/study/:userId/:studyContentsId/review/:reviewContentsId', ensurer.ensure,
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