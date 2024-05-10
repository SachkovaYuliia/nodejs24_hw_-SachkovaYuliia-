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
    if (LOG_LEVEL === 'INFO' || LOG_LEVEL === 'WARN' || LOG_LEVEL === 'ERROR') {
      console.log(`${colors.bgGreen(moduleName)}:`, ...msg);
      logMessage(infoStream, `[INFO] ${msg.join(' ')}`);
    }
  },
  warn: (...msg) => {
    if (LOG_LEVEL === 'WARN' || LOG_LEVEL === 'ERROR') {
      console.error(`${colors.bgBlue(moduleName)}:`, ...msg);
      logMessage(errorStream, `[WARN] ${msg.join(' ')}`);
    }
  },
  error: (...msg) => {
    console.error(`${colors.bgRed(moduleName)}:`, ...msg);
    logMessage(errorStream, `[ERROR] ${msg.join(' ')}`);
  },
});


process.on('beforeExit', () => {
    infoStream.end();
    errorStream.end();
});

module.exports = getLogger;


// ___
// // ! цю частину про виключення кольорів ти десь взагалі загубила
// if (!colorsEnabled) {
//   colors.disable();
// }

// const getLogger = (moduleName) => ({
//   info: (...msg) => {
//     if (logLevel === 'info') {
//       console.log(`${colors.bgGreen(moduleName)}:`, ...msg);
//     }
//   },
//   warn: (...msg) => {
//     if (logLevel === 'warn' || logLevel === 'info') {
//       console.error(`${colors.bgBlue(moduleName)}:`, ...msg);
//     }
//   },
//   error: (...msg) => {
//     console.error(`${colors.bgRed(moduleName)}:`, ...msg);
//   },
// });

// // hw4

// function createLogsFolder() {
//     const logsDir = path.join(__dirname, '..', 'logs');
//     if (!fs.existsSync(logsDir)) {
//         fs.mkdirSync(logsDir);
//     }
// }

// createLogsFolder();

// const infoStream = fs.createWriteStream(path.join(__dirname, '..','logs', 'info.log'), { flags: 'a' });

// const errorStream = fs.createWriteStream(path.join(__dirname, '..','logs', 'errors.log'), { flags: 'a' });

// function logMessage(stream, message) {
//     const updatedMessage = `${new Date().toISOString()} - ${message}\n`;
//     stream.write(updatedMessage);
// }

// function logInfo(message) {
//   if (process.env.LOG_LEVEL === 'INFO') {
//     console.log(message);
//     logMessage(errorStream, `[WARN] ${message}`);
//   } else {
//   logMessage(infoStream, message);
//   }
// }

// function logWarn(message) {
//   if (process.env.LOG_LEVEL === 'WARN') {
//     console.log(message);
//     logMessage(errorStream, `[WARN] ${message}`);
//   } else {
//     logMessage(errorStream, `[WARN] ${message}`);
//   }
// }

// function logError(message) {
//   if (process.env.LOG_LEVEL === 'ERROR') {
//     console.log(message);
//     logMessage(errorStream, `[ERROR] ${message}`);
//   } else {
//     logMessage(errorStream, `[ERROR] ${message}`);
//   }
// }

// logInfo('It is test for the info message.');
// logWarn('It is test for the warning message.');
// logError('It is test for the error message.');
// logInfo('It is test for the info message2.');
// logWarn('It is test for the warning message2.');
// logError('It is test for the error message2.');
// logInfo('It is test for the info message3.');
// logWarn('It is test for the warning message3.');
// logError('It is test for the error message3.');

// process.on('beforeExit', () => {
//     infoStream.end();
//     errorStream.end();
// });

// module.exports = getLogger;
