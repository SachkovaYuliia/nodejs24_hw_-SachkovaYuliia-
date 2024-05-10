// тут ми підтягуємо значення із файліка .env (якщо він є) і запихуєм в змінні в process.env
// ми це зробимо тут, в точці входу в нашу програму - і це має ефект на все одразу, де буде використовуватись конфіг
const dotenv = require('dotenv');
dotenv.config();

const getLogger = require('./utils/logger'); 
const myLogger = getLogger('getLogger');


// myLogger.info('Module', 'the script is running!');
// myLogger.warn('Module', 'another script is running!');
// myLogger.error('Module', 'the script is not running!');

const fileSync = require('./file_sync');
fileSync.start();
