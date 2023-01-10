require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const devDatabaseUrl = 'mongodb://localhost:27017/moviesdb';

const { PORT = 3000, NODE_ENV, DATABASE_URL } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();

app.use('*', cors());
app.use(helmet());
app.use(requestLogger);
app.use(limiter); // подключаем rate-limiter

app.use(bodyParser.json());
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : devDatabaseUrl);

app.listen(PORT);
