// тут ми підтягуємо значення із файліка .env (якщо він є) і запихуєм в змінні в process.env
// ми це зробимо тут, в точці входу в нашу програму - і це має ефект на все одразу, де буде використовуватись конфіг
const dotenv = require('dotenv');
dotenv.config();

const logger = require('./utils/logger')('main module');
logger.info('this is correct way to use logger');

const fileSync = require('./file_sync');
fileSync.start();
