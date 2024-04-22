// імпортуємо як один об'єкт всі ключі відразу:
const logger = require('./utils/logger')('main');

logger.info('the script is running!');
logger.warn('another script is running!');
logger.error('the script is not running!');
