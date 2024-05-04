const fs = require('fs');
const fsAsync = require('fs/promises');
const fsExtra = require('fs-extra');
const path = require('path');

async function copyDirectoryAsync(sourceDir, targetDir) {
    try {
        await fsExtra.copy(sourceDir, targetDir, { overwrite: false });
        console.info('Directory copy successful');

        const sourceFiles = await fsAsync.readdir(sourceDir);
        const targetFiles = await fsAsync.readdir(targetDir);

        for (const file of sourceFiles) {
            const sourcePath = path.join(sourceDir, file);
            const targetPath = path.join(targetDir, file);

            if (!targetFiles.includes(file)) {
                await fsAsync.copyFile(sourcePath, targetPath);
                console.info(`The file ${file} was successfully copied to the target directory.`);
            }
        }

        for (const file of sourceFiles) {
            const sourcePath = path.join(sourceDir, file);
            const targetPath = path.join(targetDir, file);

            const stats = await fsAsync.stat(sourcePath);
            const targetStats = await fsAsync.stat(targetPath);

            if (stats.isDirectory()) {
                if (!targetStats || !targetStats.isDirectory()) {
                    await fsAsync.mkdir(targetPath);
                }
                await copyDirectoryAsync(sourcePath, targetPath);
            } else {
                if (!targetFiles.includes(file)) {
                    await fsAsync.copyFile(sourcePath, targetPath);
                    console.info(`The file ${file} was successfully copied to the target directory.`);
                } else {
                    console.warn(`The file ${file} already exists in the target directory.`);
                }
            }
        }
    } catch (err) {
        console.error('Error copying directory:', err);
    }
}

async function start() {
    try {
        await copyDirectoryAsync('./source', './target');
        console.info('Directory copy successful');
    } catch (err) {
        console.error('Error copying directory:', err);
    }
}

module.exports = { start };