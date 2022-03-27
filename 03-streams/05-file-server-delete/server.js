const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  if (pathname.includes('/') || pathname.includes('..')) {
    res.statusCode = 400;
    res.end('Nested paths are not allowed');
    return;
  }

  switch (req.method) {
    case 'DELETE':
      fs.access(filepath, function(error){
        if (error) {
          res.statusCode = 404;
          return res.end('File not found');
        } else {
          fs.unlink(filepath, (err) => {});
          res.statusCode = 200;
          return res.end('delete');
        }
    });
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
