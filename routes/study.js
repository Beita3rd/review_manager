'use strict';
const express = require('express');
const router = express.Router();
const StudyContent = require('../models/study-content');
const ReviewContent = require('../models/review-content');
const ensurer = require('./authentication-ensurer');

// 一覧表示
router.get('/', ensurer.ensure, (req, res) => {
  StudyContent.findAll({
    where: {user_id: req.session.userId},
    order: [['created_at', 'DESC']]}).then((studyContent) => {
      res.render('study-contents', {studyContent: studyContent});
  });
});

router.get('/new', ensurer.ensure, (req, res) => {
  res.render('new-study-contents');
});


// 勉強内容の保存
router.post('/new', ensurer.ensure, 
  // 入力値のチェック
  (req, res, next) => {
    const studyContents = req.body.studyContents;
    const studyDate = req.body.studyDate;
    const errors = [];
    if (studyContents === '') {
      errors.push('ユーザー名が空です');
    }
    if (studyDate === '') {
      errors.push('メールアドレスが空です');
    }
    
    if (errors.length > 0) {
      console.log(errors);
      res.redirect('/study/new');
    } else {
      next();
    }
  },
  // データベースに保存
  (req, res, next) => {
    const studyContents = req.body.studyContents;
    const studyDate = req.body.studyDate;

    StudyContent.create({
      study_contents: studyContents,
      created_at: studyDate,
      user_id: req.session.userId
    }).then((studyContents) => {
      let date = new Date(studyDate);
      date.setDate( date.getDate() + 1 );
      ReviewContent.create({
        review_date: date,
        number_of: 1,
        study_contents_id: studyContents.study_contents_id
      }).then(() => {
        res.redirect('/study');
      })
    });
  }
);

module.exports = router;
