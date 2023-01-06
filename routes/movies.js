const router = require('express').Router();

const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');

const auth = require('../middlewares/auth');

router.use(auth);

router.get('/movies', getMovies);
router.post('/movies', createMovie);
router.delete('/movies/:filmId', deleteMovie);

module.exports = router;
