require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter, devDatabaseUrl} = require('./utils/config');

const { PORT = 3000, NODE_ENV, DATABASE_URL } = process.env;

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
