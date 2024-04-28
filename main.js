const logger = require('./utils/logger');
const dotenv = require('dotenv');
logger.info('Module', 'the script is running!');
logger.warn('Module', 'another script is running!');
logger.error('Module', 'the script is not running!');
