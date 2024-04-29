const dotenv = require('dotenv');
dotenv.config();
const {bgGreen, bgBlue, bgRed} = require('colors/safe');

// const config = require('config');
// const COLORS_ENABLED = config.get('COLORS_ENABLED');
// const LOG_LEVEL = config.get('LOG_LEVEL');

const COLORS_ENABLED = process.env.COLORS_ENABLED;
const LOG_LEVEL = process.env.LOG_LEVEL;

console.log(COLORS_ENABLED);
console.log(LOG_LEVEL);

function getModuleColor(col) {
    if (COLORS_ENABLED === 1) {
      switch (col) {
        case 'info':
          return bgGreen;
        case 'warn':
          return bgBlue;
        case 'error':
          return bgRed;
        default:
          return moduleName => moduleName; 
      }
    } else {
      return moduleName => moduleName; 
    }
  }
  
  const getLogger = {
    info: (moduleName, msg) => {
      if (LOG_LEVEL === 'info') {
        console.log(`${getModuleColor('info')(moduleName)}: ${msg}`);
      }
    },
    warn: (moduleName, msg) => {
      if (LOG_LEVEL === 'warn' || LOG_LEVEL === 'info') {
        console.log(`${getModuleColor('warn')(moduleName)}: ${msg}`);
      }
    },
    error: (moduleName, msg) => {
      if (LOG_LEVEL === 'error'|| LOG_LEVEL === 'info'|| LOG_LEVEL === 'warn') {
        console.log(`${getModuleColor('error')(moduleName)}: ${msg}`);
      }
    }
  };

module.exports = getLogger;