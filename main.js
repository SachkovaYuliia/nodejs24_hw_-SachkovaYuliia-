// тут ми підтягуємо значення із файліка .env (якщо він є) і запихуєм в змінні в process.env
// ми це зробимо тут, в точці входу в нашу програму - і це має ефект на все одразу, де буде використовуватись конфіг
const dotenv = require('dotenv');
dotenv.config();

const logger = require('./utils/logger');

logger.info('Module', 'the script is running!');
logger.warn('Module', 'another script is running!');
logger.error('Module', 'the script is not running!');

const fileSync = require('./file_sync');
fileSync.start();
