const router = require('express').Router();

const {
  getUserInfo,
  updateUser,
} = require('../controllers/users');

router.get('/users/me', getUserInfo);
router.patch('/users/me', updateUser);

module.exports = router;
