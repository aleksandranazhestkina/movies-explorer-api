const router = require('express').Router();
const routerUser = require('./users');
const routerMovies = require('./movies');
const NotFoundError = require('../errors/not-found-error');
const { createUser, login } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

router.post('/signin', validateLogin, login);

router.post('/signup', validateCreateUser, createUser);
router.use(auth);
router.use('/', routerUser);
router.use('/', routerMovies);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Ресурс по указанному адресу не найден'));
});

module.exports = router;
