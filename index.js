const http = require('http');
const app = require('./src/app');

const server = http.createServer(app);

server.listen(3000, '127.0.0.1', () => {
    console.log('Server is running on localhost');
});
