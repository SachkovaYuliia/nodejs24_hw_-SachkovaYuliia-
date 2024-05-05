const colors = require('colors');
const { colorsEnabled, logLevel } = require('config');

//! цю частину про виключення кольорів ти десь взагалі загубила
if (!colorsEnabled) {
  colors.disable();
}

const getLogger = (moduleName) => ({
  info: (...msg) => {
    if (logLevel === 'info') {
      console.log(`${colors.bgGreen(moduleName)}:`, ...msg);
    }
  },
  warn: (...msg) => {
    if (logLevel === 'warn' || logLevel === 'info') {
      console.error(`${colors.bgBlue(moduleName)}:`, ...msg);
    }
  },
  error: (...msg) => {
    console.error(`${colors.bgRed(moduleName)}:`, ...msg);
  },
});

module.exports = getLogger;
