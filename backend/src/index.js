const app = require('./app');
const logger = require('./lib/logger.config');

const { PORT } = process.env;

app.listen(PORT, () => {
	logger.info(`Server started on port ${PORT}`);
});
