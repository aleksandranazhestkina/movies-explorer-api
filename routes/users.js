const router = require('express').Router();
const { validateUpdateUser } = require('../middlewares/validation');

const {
  getUserInfo,
  updateUser,
} = require('../controllers/users');

router.get('/users/me', getUserInfo);
router.patch('/users/me', validateUpdateUser, updateUser);

module.exports = router;
