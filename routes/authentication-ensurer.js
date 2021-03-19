'use strict';

function ensure(req, res, next) {
  if (req.session.userId === undefined) {
    res.redirect('/login');
  }
  return next();
}

// ログイン、新規登録用
function ensureForLogin(req, res, next) {
  if (req.session.userId === undefined) {
    return next();
  }
  res.redirect('/review');
}

module.exports = {
  ensure,
  ensureForLogin
};