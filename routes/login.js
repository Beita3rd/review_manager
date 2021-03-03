'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
  res.render('login');
});


router.post('/', (req, res, next) => {
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