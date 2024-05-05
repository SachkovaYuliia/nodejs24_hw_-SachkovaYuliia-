const fsAsync = require('fs/promises');
const path = require('path');
const logger = require('./utils/logger')('file sync'); //! не забуваємо про наш логгер

async function copyDirectoryAsync(sourceDir, targetDir) {
    // потрібен всього один цикл по контенту. Всередині, ми дивимось що це за айтем
    const sourceItems = await fsAsync.readdir(sourceDir); // саме "items" - тому що там і файли, і каталоги разом
    const targetItems = await fsAsync.readdir(targetDir);

    for (const item of sourceItems) {
        const sourceItemPath = path.join(sourceDir, item);
        const targetItemPath = path.join(targetDir, item);

        if (targetItems.includes(item)) {
            logger.warn(`${item} already exists in ${targetDir}`);
            continue; // айтем вже є в target, переходимо до наступного
        }

        // якщо файл - копіюємо, якщо каталог - створюємо такий самий каталог в target і перекидаємось на нього як на новий source
        const sourceItemStats = await fsAsync.stat(sourceItemPath);
        if (sourceItemStats.isFile()) {
            fsAsync.copyFile(sourceItemPath, targetItemPath);
            logger.info(`File ${targetItemPath} copied successfully`);
            continue; // це був файл, його не було в target, скопіювали і переходимо до наступної ітерації циклу
        }

        if (sourceItemStats.isDirectory()) {
            await fsAsync.mkdir(targetItemPath);
            logger.info(`Directory ${targetItemPath} created`);
            await copyDirectoryAsync(sourceItemPath, targetItemPath);
        }
    }
}

async function start() {
    try {
        await copyDirectoryAsync('./source', './target');
        logger.info('File synchronization finished');
    } catch (err) {
        logger.error('File sync process failed:', err);
    }
}

module.exports = { start };