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


// 勉強内容の保存
router.post('/new', ensurer.ensure, 
  // 入力値のチェック
  (req, res, next) => {
    const studyContents = req.body.studyContents;
    const studyDate = req.body.studyDate;
    const errors = [];
    if (studyContents === '') {
      errors.push('勉強内容がからです');
    }
    if (studyDate === '') {
      errors.push('日付が空です');
    }
    
    if (errors.length > 0) {
      console.log(errors);
      res.redirect('/review');
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
      ReviewContent.create({
        review_date: studyDate,
        number_of: 0,
        study_contents_id: studyContents.study_contents_id
      }).then(() => {
        res.redirect('/review');
      })
    });
  }
);

// 勉強内容の編集
router.post('/edit/:study_contents_id', ensurer.ensure,
  (req, res, next) => {
    const studyContents = req.body.studyContents;
    const studyDate = req.body.studyDate;
    const errors = [];
    if (studyContents === '') {
      errors.push('勉強内容がからです');
    }
    if (studyDate === '') {
      errors.push('日付が空です');
    }
    
    if (errors.length > 0) {
      console.log(errors);
      res.redirect('/study');
    } else {
      next();
    }
  },
  (req, res, next) => {
    const studyContents = req.body.studyContents;
    const studyDate = req.body.studyDate;
    StudyContent.update({
      study_contents: studyContents,
      created_at: studyDate
    },{
      where: {
        study_contents_id: req.params.study_contents_id,
        user_id: req.session.userId
      }
    }).then((studyContent) => {
      if (studyContent.length > 0) {
        res.redirect('/study');
      } else {
        const err = new Error('user_idが一致しません');
        err.status = 404;
        next(err);
      }
    });
  }
);

// 勉強の削除
router.get('/destroy/:study_contents_id', ensurer.ensure, 
  (req, res, next) => {
    const study_contents_id = req.params.study_contents_id;
    StudyContent.findOne({
      where: {study_contents_id: study_contents_id}
    }).then((studyContent) => {
      const user_id = studyContent.user_id;
      if (user_id == req.session.userId){
        next();
      } else {
        const err = new Error('user_idが一致しません');
        err.status = 404;
        next(err);
      }
    })
  },
  (req, res, next) => {
    const study_contents_id = req.params.study_contents_id;
    StudyContent.destroy({
      where: {
        study_contents_id: study_contents_id
      }
    }).then(() => {
      StudyContent.destroy({
        where: {
          study_contents_id: study_contents_id
        }
      })
    }).then(() => {
      res.redirect('/study');
    })
  }
);

module.exports = router;
