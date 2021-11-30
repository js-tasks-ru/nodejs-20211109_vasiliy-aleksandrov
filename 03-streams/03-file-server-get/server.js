const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

const mime = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript'
};

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);
  const ROOT = __dirname + '/files';
  const filepath = path.join(__dirname, 'files', pathname);
  const type = mime[path.extname(filepath).slice(1)] || 'text/plain';
  const stream = fs.createReadStream(filepath);

  switch (req.method) {
    case 'GET':

      if (filepath.indexOf(ROOT) !== 0) {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Forbidden');
      }

      stream.on('open', () => {
          res.setHeader('Content-Type', type);
          stream.pipe(res);
      });

      stream.on('error', (err) => {
        if (err.code === 'ENOENT') {
          if (pathname.indexOf('/') !== -1) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/plain');
            return res.end('No such file or directory');
          }

          res.setHeader('Content-Type', 'text/plain');
          res.statusCode = 404;
          return res.end('Not found');
          }
      });
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
