'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const StudyContent = require('../models/study-content');
const ensurer = require('./authentication-ensurer');

// 一覧表示
router.get('/', ensurer.ensure, (req, res) => {
  StudyContent.findAll({
    where: {userId: req.session.userId},
    order: [['studyDate', 'DESC']]}).then((studyContent) => {
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
      studyContents: studyContents,
      studyDate: studyDate,
      updatedAt: studyDate,
      reviewTimes: 0,
      userId: req.session.userId
    }).then((contents) => {
      console.log(contents.studyContents, 'を登録しました');
      res.redirect('/study');
    });
  }
);

module.exports = router;
