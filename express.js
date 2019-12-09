const { Server: server } = require('http');
const express = require('express');
const cors = require('cors');
const { promises: { readFile } } = require('fs'); 

const { X_PORT: PORT} = require('./config');

const app = express();
const routerAPI = express.Router();
const routerUI = express.Router();

routerAPI
  .use(cors())
  .use(express.json())
  .get('/', async (res, req, next) => {
    try {
      req.json(await readFile('./storage.json').then(data => JSON.parse(data)));
    } catch (error) {
      next(error);
    }
  })
  .post('/', async (res, req, next) => {
    try {
      const storage = await readFile('./storage.json').then(data => JSON.parse(data))
      req.json();
      req.json(await readFile('./storage.json').then(data => JSON.parse(data)));
    } catch (error) {
      next(error);
    }
  })
;

routerUI
  .get('/', async (res, req) => {
    req.send(await readFile('./index.html'));
  })
;

app
  .use(express.static('./public'))
  .use((res, req, next) => req.status(200).set('Content-Type', 'text/html; charset=utf-8') && next())
  .use('/', routerUI)
  .use('/api/log', routerAPI)
  .use((res, req) => req.status(404).end('<h1 style="padding: 0 auto">Not found</h1>'))
  .use((err, res, req) => req.status(500).end(`<h1 style="padding: 0 auto">Ошибка: ${err}</h1>`))
;

server(app).listen(process.env.PORT || PORT, () => console.log(`Express server, proc: ${process.pid}`));
