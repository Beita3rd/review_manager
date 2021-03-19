var express = require('express');
var router = express.Router();
const ensurer = require('./authentication-ensurer');

/* GET home page. */
router.get('/', ensurer.ensureForLogin, function(req, res, next) {
  res.render('index');
});

module.exports = router;
