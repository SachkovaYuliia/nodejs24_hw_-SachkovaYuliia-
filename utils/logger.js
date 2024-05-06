const colors = require('colors');
const { colorsEnabled, logLevel } = require('config');
const fs = require('fs');
const path = require('path');
const { Readable, Writable } = require('stream');

// ! цю частину про виключення кольорів ти десь взагалі загубила
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

// _____hw4

function createLogsFolder() {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
    }
    const infoLogFile = path.join(logsDir, 'info.log');
    const errorLogFile = path.join(logsDir, 'errors.log');
    if (!fs.existsSync(infoLogFile)) {
        fs.writeFileSync(infoLogFile, ''); 
    }
    if (!fs.existsSync(errorLogFile)) {
        fs.writeFileSync(errorLogFile, ''); 
    }
}

createLogsFolder();


module.exports = getLogger;
