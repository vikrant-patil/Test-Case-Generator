const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');

const NotFound = require('./app/errors/NotFound');
const apiRouter = require('./app/routes');

const app = express();
require('dotenv').config();

app.set('trust proxy', 1);

app.use(helmet());
app.use(
	cors({
		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
		credentials: true,
		origin: process.env.CORS_ORIGIN,
	}),
);
app.use(compression());
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));
app.use(express.json());

// creates the get route for /

app.get('/', (req, res) => {
	res.json({
		message: 'TestCase Generator',
	});
});

// routes all /api/v1 endpoints to 'src/app/routes/index.js'
app.use('/api/v1', apiRouter);
app.use(NotFound);
module.exports = app;
