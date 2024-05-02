const fs = require('fs');
const path = require('path');
const colors = require('colors');

const newLogger = {
    info: function(message) {
        console.log('[INFO]'.green, message.green);
    },
    warn: function(message) {
        console.log('[WARN]'.red, message.red);
    }
};

function copyFile(sourceFile, targetFile, callback) {
    fs.copyFile(sourceFile, targetFile, err => {
        if (err) {
            callback(err);
        } else {
            newLogger.info(`The file ${path.basename(sourceFile)} was successfully copied to the target directory.`);
            callback(null);
        }
    });
}

function copyDirectory(sourceDir, targetDir, callback) {
    fs.readdir(sourceDir, (err, files) => {
        if (err) {
            callback(err);
            return;
        }

        let pending = files.length;

        files.forEach(file => {
            const sourcePath = path.join(sourceDir, file);
            const targetPath = path.join(targetDir, file);

            fs.stat(sourcePath, (err, stats) => {
                if (err) {
                    callback(err);
                    return;
                }

                if (stats.isDirectory()) {
                    fs.mkdir(targetPath, { recursive: true }, (err) => {
                        if (err) {
                            callback(err);
                            return;
                        }

                        copyDirectory(sourcePath, targetPath, (err) => {
                            if (--pending === 0) {
                                callback(err);
                            }
                        });
                    });
                } else {
                    fs.access(targetPath, fs.constants.F_OK, (err) => {
                        if (err) {
                            copyFile(sourcePath, targetPath, (err) => {
                                if (--pending === 0) {
                                    callback(err);
                                }
                            });
                        } else {
                            newLogger.warn(`The file ${path.basename(sourcePath)} is already exists in the target directory.`);
                            if (--pending === 0) {
                                callback(null);
                            }
                        }
                    });
                }
            });
        });
    });
}

const fileSync = {
    start: function(callback) {
        const sourceDir = './source';
        const targetDir = './target';

        copyDirectory(sourceDir, targetDir, callback);
    }
};

fileSync.start((err) => {
    if (err) {
        console.error('Oops, something went wrong:', err);
    }
});
module.exports = newLogger;