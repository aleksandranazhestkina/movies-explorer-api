module.exports.ERROR_CODE_BAD_REQUEST = 400;
module.exports.ERROR_CODE_UNAUTHORIZED = 401;
module.exports.ERROR_CODE_FORBIDDEN = 403;
module.exports.ERROR_CODE_NOT_FOUND = 404;
module.exports.ERROR_CODE_CONFLICT = 409;
module.exports.ERROR_CODE_INTERNAL_SERVER_ERROR = 500;

module.exports.ACCESS_ERROR = 'Попытка удалить чужой фильм.';
module.exports.MOVIE_NOT_FOUND = 'Фильм с указанным _id не найден.';
module.exports.MOVIE_IS_DELETE = 'Фильм удален.';
module.exports.WRONG_DATA_MOVIE_DELETE = 'Переданы некорректные данные при удалении фильма.';
module.exports.WRONG_DATA_MOVIE = 'Переданы некорректные данные при создании фильма.';
module.exports.EMAIL_ALREADY_EXISTS = 'Пользователь с таким email уже существует.';
module.exports.WRONG_DATA_USER = 'Переданы некорректные данные при создании пользователя.';
module.exports.WRONG_DATA_PROFILE = 'Переданы некорректные данные при обновлении профиля.';
module.exports.USER_NOT_FOUND = 'Пользователь по указанному _id не найден.';
module.exports.WRONG_USER_ID = 'Передан некорректный _id пользователя.';
module.exports.AUTHORIZATION_REQUIRED = 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.';
module.exports.SERVER_ERROR = 'На сервере произошла ошибка.';
module.exports.WRONG_EMAIL_OR_PASSWORD = 'Вы ввели неправильный логин или пароль.';
module.exports.WRONG_EMAIL = 'Некорректный email.';
module.exports.WRONG_URL_FORMAT = 'Некорректный адрес URL.';
module.exports.URL_NOT_FOUND = 'Запрашиваемый ресурс не найден, проверьте адрес';
