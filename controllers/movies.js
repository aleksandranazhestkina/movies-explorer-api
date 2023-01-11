const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const ConflictError = require('../errors/conflict-error');
const {
  WRONG_DATA_MOVIE,
  MOVIE_IS_DELETE,
  WRONG_DATA_MOVIE_DELETE,
  MOVIE_NOT_FOUND,
  ACCESS_ERROR,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies.reverse()))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(WRONG_DATA_MOVIE));
      } else if (err.code === 11000) {
        next(new ConflictError());
      }
      else {
        next(err);
      }
    });
};

// module.exports.deleteMovie = (req, res, next) => {
//   Movie.findById(req.params.movieId)
//     .orFail(new NotFoundError('Фильм с указанным _id не найден.'))
//     .then((movie) => {
//       if (!movie.owner.equals(req.user._id)) {
//         next(new ForbiddenError('Попытка удалить чужой фильм.'));
//       }
//       return movie.remove();
//     })
//     .then(() => {
//       res.send({ message: 'Фильм удален' });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new BadRequestError('Переданы некорректные данные при удалении фильма.'));
//       } else {
//         next(err);
//       }
//     });
// };

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById()
    .orFail(() => (new NotFoundError(MOVIE_NOT_FOUND)))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        return Movie.findByIdAndRemove()
          .then(() => res.send(MOVIE_IS_DELETE))
          .catch(next);
      }
      return next(new ForbiddenError(ACCESS_ERROR));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(WRONG_DATA_MOVIE_DELETE));
      } else {
        next(err);
      }
    });
};
