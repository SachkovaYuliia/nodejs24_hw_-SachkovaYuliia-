// const dotenv = require('dotenv');
// dotenv.config();
const http = require('http');
const logger = require('./utils/logger')('server');

const {port} = require('config');

const server = http.createServer();
server.listen(port);

server.on('listening', () => {
    logger.info(`Server listening on port [${port}]`);
});

server.on('request', (req, resp) => {

    if (req.url === '/healthcheck') {
        if (req.method === 'GET') {
            resp.writeHead(200, { 'content-type': 'text/plain' });
            resp.end('healthcheck passed');
            logger.info(`${req.method} ${req.url} 200`);
            return; 
        } else {
            resp.writeHead(404, { 'content-type': 'text/plain' });
            resp.end('404 Not Found');
            logger.warn(`${req.method} ${req.url} 404`);
            return; 
        }
    } else {
        resp.writeHead(404, { 'content-type': 'text/plain' });
        resp.end('404 Not Found');
        logger.warn(`${req.method} ${req.url} 404`);
        return; 
    }
});