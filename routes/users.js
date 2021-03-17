'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const ensurer = require('./authentication-ensurer');

router.get('/signup', ensurer.ensureForLogin, (req, res) => {
  res.render('signup', {isUsed: false});
});

router.post('/signup', ensurer.ensureForLogin,
  //メールアドレスがすでに登録されているかのチェック
  (req, res, next) => {
    const email = req.body.email;
    
    User.findOne({where: {email: email}}).then((user) => {
      if(user === null){
        next();
      } else{
        res.render('signup', {isUsed: true});
      }
    });
  },
  //データベースに登録
  (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    //パスワードをハッシュ化
    bcrypt.hash(password, 10, (error, hash) => {
      User.create({
        user_name: name,
        email: email,
        password: hash
      }).then((user) => {
        req.session.userId = user.user_id;
        req.session.username = user.user_name;
        console.log(user.user_name, 'を登録しました');
        res.redirect('/review');
      });
    });
  }
);

module.exports = router;
