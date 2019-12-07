// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

const { promises: { readFile } } = require('fs'); 

// Declare a route
fastify.get('/', async (req, res) => {
  res.header('Content-Type', 'text/html; charset=utf-8');
  res.send((await readFile('./index.html')).toString());
})

// Run the server!
fastify.listen(3000, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
})