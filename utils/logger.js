const {bgBlue, bgRed, bgGreen} = require('colors/safe');
const config = require('config');

const COLORS_ENABLED = config.get('COLORS_ENABLED');
const LOG_LEVEL = config.get('LOG_LEVEL');

function getModuleColor(col) {
    if (COLORS_ENABLED === 1) {
      switch (col) {
        case 'info':
          return bgBlue;
        case 'warn':
          return bgRed;
        case 'error':
          return bgGreen;
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