const restify = require('restify');
const { promises: { readFile } } = require('fs');

const server = restify.createServer();

server.get('/', async (req, res, next) => 
  res
    .sendRaw(
        200, 
        (await readFile('./index.html')).toString(), 
        {'content-type': 'text/html'}
      ) && 
  next());

server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url);
});