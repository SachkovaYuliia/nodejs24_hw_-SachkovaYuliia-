const dotenv = require('dotenv');
dotenv.config();
const colors = require('colors');

const COLORS_ENABLED = process.env.COLORS_ENABLED;
const LOG_LEVEL = process.env.LOG_LEVEL;

console.log(COLORS_ENABLED);
console.log(LOG_LEVEL);

const getLogger = {
  info: (moduleName, msg) => {
      if (LOG_LEVEL === 'info') {
          console.log(`${colors.bgGreen(moduleName)}: ${msg}`);
      }
  },
  warn: (moduleName, msg) => {
      if (LOG_LEVEL === 'warn' || LOG_LEVEL === 'info') {
          console.log(`${colors.bgBlue(moduleName)}: ${msg}`);
      }
  },
  error: (moduleName, msg) =>  {
          console.log(`${colors.bgReded(moduleName)}: ${msg}`);
  }
};

module.exports = getLogger;
