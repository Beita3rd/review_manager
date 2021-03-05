'use strict';

function ensure(req, res, next) {
  if (req.session.userId === undefined) {
    res.redirect('/login');
  }
  return next();
}

function ensureForLogin(req, res, next) {
  if (req.session.userId === undefined) {
    return next();
  }
  res.redirect('/');
}

module.exports = {
  ensure,
  ensureForLogin
};