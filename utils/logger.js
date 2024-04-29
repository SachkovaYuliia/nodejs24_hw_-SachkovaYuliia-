const colors = require('colors');
const { colorsEnabled, logLevel } = require('config');

//! цю частину про виключення кольорів ти десь взагалі загубила
if (!colorsEnabled) {
  colors.disable();
}

const getLogger = {
  info: (moduleName, msg) => {
    if (logLevel === 'info') {
      console.log(`${colors.bgGreen(moduleName)}: ${msg}`);
    }
  },
  warn: (moduleName, msg) => {
    if (logLevel === 'warn' || logLevel === 'info') {
      console.error(`${colors.bgBlue(moduleName)}: ${msg}`);
    }
  },
  error: (moduleName, msg) => {
    console.error(`${colors.bgRed(moduleName)}: ${msg}`);
  },
};

module.exports = getLogger;
