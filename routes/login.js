'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ensurer = require('./authentication-ensurer');
const bcrypt = require('bcrypt');

router.get('/', ensurer.ensureForLogin, (req, res, next) => {
  res.render('login', {isWrong: false});
});


router.post('/', ensurer.ensureForLogin, (req, res, next) => {
  //emailのチェック
  // const email = req.body.email;
  const name = req.body.name;

  User.findOne({where: {user_name: name}}).then((user) => {
    if(user === null){
      res.render('login', {isWrong: true});
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
          res.redirect('/review');
        } else{
          res.render('login', {isWrong: true});
        }
      });
    }
  });
});

module.exports = router;