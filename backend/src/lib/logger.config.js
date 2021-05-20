const winston = require('winston');

const logger = winston.createLogger({
	format: winston.format.json(),
	defaultMeta: { service: 'user-service' },
	transports: [],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.prettyPrint(),
				winston.format.colorize(),
			),
		}),
	);
} else {
	logger.add(
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
	);
	logger.add(new winston.transports.File({ filename: 'combined.log' }));
}

module.exports = logger;
