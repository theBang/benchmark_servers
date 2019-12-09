'use strict'
const { promises: { readFile } } = require('fs'); 

require('http').createServer(async (req, res) => {
  res.setHeader('content-type', 'text/html; charset=utf-8');
  res.end(await readFile('./index.html'));
}).listen(3000)

