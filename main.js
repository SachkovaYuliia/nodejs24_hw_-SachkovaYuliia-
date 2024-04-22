// імпортуємо як один об'єкт всі ключі відразу:
const logger = require('./utils/logger')('main');

logger.info('the script is running!');
logger.warn('another script is running!');
logger.error('the script is not running!');

// та передаємо повідомлення в створені в модулі logger методи: 
// logger.info('My first homework is here');
// logger.warn('Is everything alright?');
// logger.error('No way!');

// або ж імпортуємо та передаємо інфорацію по одному:

// const {info} = require('./utils/logger');
// info('My first homework is here');
// const {warn} = require('./utils/logger');
// warn('Is everything alright?');
// const {error} = require('./utils/logger');
// error('No way!');

// або вивiд напряму:
// const {info, warn, error} = require('./utils/logger')();
// info('My first homework is here');
// warn('Is everything alright?');
// error('No way!');

