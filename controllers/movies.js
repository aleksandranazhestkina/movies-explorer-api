const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((films) => res.send(films.reverse()))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((film) => res.send(film))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { filmId } = req.params;
  Movie.findById(filmId)
    .orFail(new NotFoundError('Фильм с указанным _id не найден.'))
    .then((film) => {
      if (!film.owner.equals(req.user._id)) {
        next(new ForbiddenError('Попытка удалить чужой фильм.'));
      }
      return film.remove();
    })
    .then(() => {
      res.send({ message: `Фильм ${filmId} удален` });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при удалении фильма.'));
      } else {
        next(err);
      }
    });
};
