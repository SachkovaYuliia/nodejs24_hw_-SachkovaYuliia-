const express = require('express');
const morgan = require('morgan');
const getLogger = require('./utils/logger');
const logrotate = require('logrotate-stream');
const path = require('path');
const config = require('config');
require('dotenv').config();

const logger = getLogger('express srv');

const app = express();
app.use(express.json());

const logStream = logrotate({
    file: path.join(__dirname, 'access.log'),
    size: '1M',
    keep: 3
});

app.set('view engine', 'pug');

app.use(morgan('combined', { stream: logStream }));
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.on('finish', () => {
        logger.info(`${new Date().toISOString()} ${req.method} ${req.url} ${res.statusCode}`);
    });
    next();
});

app.use(express.static('static'));

const { userDataRouter } = require('./routers/userData');
const { pagesRouter } = require('./routers/pages');
app.use('/users', userDataRouter);

const srvConfig = config.get('server');
app.listen(srvConfig.port, () => logger.info(`Server is listening on [${srvConfig.port}]`));

app.use('/pug', pagesRouter)