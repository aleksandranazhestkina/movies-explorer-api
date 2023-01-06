const router = require('express').Router();
const routerUser = require('./users');
const NotFoundError = require('../errors/not-found-error');
const { createUser, login } = require('../controllers/users');

router.post('/signin', login);

router.post('/signup', createUser);

router.use('/', routerUser);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Ресурс по указанному адресу не найден'));
});

module.exports = router;
