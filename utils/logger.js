const colors = require('colors');
const { colorsEnabled, logLevel } = require('config');
const fs = require('fs');
const path = require('path');

const { LOG_LEVEL, COLORS_ENABLED } = process.env;

if (!colorsEnabled) {
  colors.disable();
}

function createLogsFolder() {
  const logsDir = path.join(__dirname, '..', 'logs');
  if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
  }
}

createLogsFolder();

const infoStream = fs.createWriteStream(path.join(__dirname, '..','logs', 'info.log'), { flags: 'a' });
const errorStream = fs.createWriteStream(path.join(__dirname, '..','logs', 'errors.log'), { flags: 'a' });

function logMessage(stream, message) {
  const updatedMessage = `${new Date().toISOString()} - ${message}\n`;
  stream.write(updatedMessage);
}

const getLogger = (moduleName) => ({
  info: (...msg) => {
    logMessage(infoStream, `[INFO] ${msg.join(' ')}`);

    if (LOG_LEVEL === 'INFO' || LOG_LEVEL === 'WARN' || LOG_LEVEL === 'ERROR') {
      console.log(`${colors.bgGreen(moduleName)}:`, ...msg);
    }
  },
  warn: (...msg) => {
    logMessage(errorStream, `[WARN] ${msg.join(' ')}`);

    if (LOG_LEVEL === 'WARN' || LOG_LEVEL === 'ERROR') {
      console.error(`${colors.bgBlue(moduleName)}:`, ...msg);
    }
  },
  error: (...msg) => {
    logMessage(errorStream, `[ERROR] ${msg.join(' ')}`);
    console.error(`${colors.bgRed(moduleName)}:`, ...msg);
  },
});


process.on('beforeExit', () => {
    infoStream.end();
    errorStream.end();
});

module.exports = getLogger;
