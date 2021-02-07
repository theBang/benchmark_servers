const {text} = require('micro')
const { promises: { readFile } } = require('fs'); 

module.exports = async () => String(await readFile('./index.html'));