const router = require('express').Router();
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validation');

const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', validateCreateMovie, createMovie);
router.delete('/movies/:filmId', validateDeleteMovie, deleteMovie);

module.exports = router;
