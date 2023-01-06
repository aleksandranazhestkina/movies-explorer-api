const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getUserInfo,
  updateUser,
} = require('../controllers/users');

router.use(auth);

router.get('/users/me', getUserInfo);
router.patch('/users/me', updateUser);

module.exports = router;
