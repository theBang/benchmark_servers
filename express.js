const { Server: server } = require('http');
const express = require('express');
const { X_PORT: PORT } = require('./config');

const app = express();
const routerUI = express.Router();

routerUI
  .get('/', async (req, res) => res.json({ "test": "Data" }));

app
  .use(express.static('./public'))
  .use('/', routerUI)
  .use((req, res) => res.status(404).end('<h1 style="padding: 0 auto">Not found</h1>'))
  .use((err, req, res) => res.status(500).end(`<h1 style="padding: 0 auto">Error: ${err}</h1>`));

server(app).listen(process.env.PORT || PORT, () => console.log(`Express server, proc: ${process.pid}`));
