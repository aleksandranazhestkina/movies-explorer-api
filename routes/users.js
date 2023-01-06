const router = require('express').Router();
const auth = require('../middlewares/auth');
const { validateUpdateUser } = require('../middlewares/validation');

const {
  getUserInfo,
  updateUser,
} = require('../controllers/users');

router.use(auth);

router.get('/users/me', getUserInfo);
router.patch('/users/me', validateUpdateUser, updateUser);

module.exports = router;
