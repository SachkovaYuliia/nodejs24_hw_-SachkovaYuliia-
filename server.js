const http = require('http');
const fs = require('fs');
const path = require('path');
const logger = require('./utils/logger')('server');
const port = 3003;
const srv = http.createServer();
srv.listen(port);
srv.on('listening', () => {
    logger.info(`Server listening on port [${port}]`);
});

srv.on('request', (req, resp) => {

    logger.info(`${req.method} ${req.url}`);

    if (req.url === '/healthcheck') {

        if (req.method === 'GET') {

            resp.setHead(200, { 'content-type': 'text/html'});
            logger.info(`${req.method} ${req.url} 200`);
            resp.end();
        } else {
            resp.setHead(404, { 'content-type': 'text/html'});
            logger.warn(`${req.method} ${req.url} 404`);
            resp.end();
        }
    } else {
        resp.setHeader('content-type', 'text/html');
        logger.warn(`${req.method} ${req.url} 404`);
        resp.end();
        return;
    }
});
    