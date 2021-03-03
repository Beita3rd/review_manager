'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup',
  //入力のチェック
  (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const errors = [];

    if (name === '') {
      errors.push('ユーザー名が空です');
    }
    if (email === '') {
      errors.push('メールアドレスが空です');
    }
    if (password === '') {
      errors.push('パスワードが空です');
    }
    
    if (errors.length > 0) {
      console.log(errors);
      res.redirect('/signup');
    } else {
      next();
    }
  },
  //メールアドレスがすでに登録されているかのチェック
  (req, res, next) => {
    const email = req.body.email;
    User.findOne({where: {email: email}}).then((user) => {
      if(user === null){
        next();
      } else{
        console.log('This email address is used');
        res.redirect('/users/signup');
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
        userName: name,
        email: email,
        password: hash
      }).then((user) => {
        console.log(user.userName, 'を登録しました');
        res.redirect('/');
      });
    });
  }
);

module.exports = router;
