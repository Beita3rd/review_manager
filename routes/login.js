'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ensurer = require('./authentication-ensurer');
const bcrypt = require('bcrypt');

router.get('/', ensurer.ensureForLogin, (req, res, next) => {
  res.render('login');
});


router.post('/', ensurer.ensureForLogin, (req, res, next) => {
  //emailのチェック
  const email = req.body.email;
  User.findOne({where: {email: email}}).then((user) => {
    if(user === null){
      console.log('not found');
      res.redirect('/login');
    } else{
      const plain = req.body.password; //平文パスワード
      const hash = user.password; //データベースのパスワード
      //パスワードの比較
      bcrypt.compare(plain, hash, (error, isEqual) => {
        if(isEqual){
          console.log('ログイン');
          //セッションに情報を保存
          req.session.userId = user.user_id;
          req.session.username = user.user_name;
          res.redirect('/');
        } else{
          console.log('パスワードが異なる');
          res.redirect('/login');
        }
      });
    }
  });
});

module.exports = router;