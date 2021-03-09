'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const StudyContent = require('../models/study-content');
const ensurer = require('./authentication-ensurer');

router.get('/', ensurer.ensure, (req, res) => {
  const today = new Date();
  StudyContent.findAll({
    where: {
      userId: req.session.userId,
      reviewDate: today
    }
  }).then((reviewContent) => {
      res.render('review-contents', {reviewContent: reviewContent});
  });
});

module.exports = router;