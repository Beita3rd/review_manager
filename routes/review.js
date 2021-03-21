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
  ("SELECT * FROM review_contents JOIN study_contents ON review_contents.study_contents_id = study_contents.study_contents_id WHERE user_id = ? AND review_date <= ? ORDER BY review_date,number_of",
  { replacements: [req.session.userId, today ], type: sequelize.QueryTypes.SELECT }
  ).then(reviewContents => {
    console.log(reviewContents);
    res.render('review-contents', {reviewContents: reviewContents});
  });
});

router.get('/:user_id/:review_contents_id', ensurer.ensure,
  //sessionIdとコンテンツのuserIdが同一か確認
  (req, res, next) => {
    const user_id = req.params.user_id;
    if (user_id == req.session.userId){
      next();
    } else {
      const err = new Error('user_idが一致しません');
      err.status = 404;
      next(err);
    }
  },
  (req, res, next) => {
    const review_contents_id = req.params.review_contents_id;
    ReviewContent.findOne({
      where: {review_contents_id: review_contents_id}
    }).then((reviewContent) => {
      const review_date = culReviewDate(reviewContent.number_of);
      ReviewContent.update({
        review_date: review_date,
        number_of: reviewContent.number_of + 1
      },{
        where: {
          review_contents_id: reviewContent.review_contents_id
        }
      })
      res.redirect('/review');
    });
  }
);

function culReviewDate (numberOf) {
  let reviewDate = new Date();
  switch (numberOf) {
    case 0:
      reviewDate.setDate( reviewDate.getDate() + 1 );
      break;
    case 1:
      reviewDate.setDate( reviewDate.getDate() + 7 );
      break;
    case 2:
      reviewDate.setDate( reviewDate.getDate() + 14 );
      break;
    default:
      reviewDate.setMonth( reviewDate.getMonth() + 1 );
  }
  return reviewDate;
}

module.exports = router;