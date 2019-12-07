const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');

const logger = require('koa-logger')

const { X_PORT: PORT } = require('./config');

const app = new Koa();

const mainRouter = new Router();
mainRouter
  .get('/', ctx => ctx.body = '<h1>Simple koa server</h1>');

app
  .use(logger())
  .use(static(path.join(__dirname, '/public')))
  .use(async (ctx, next) => {
    try {
      await next();
      if (ctx.status === 404) {
        switch (ctx.accepts('html', 'json')) {
          case 'html':
            ctx.type = 'html';
            ctx.body = '<h1>Page Not Found</h1>';
            break;
          case 'json':
            ctx.body = {
              message: 'Page Not Found'
            };
            break;
          default:
            ctx.type = 'text';
            ctx.body = 'Page Not Found';
        }
      }
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  });

app
  .use(mainRouter.routes());

app.on('error', function(err) {
  if (process.env.NODE_ENV != 'test') {
    console.log('sent error %s to the cloud', err.message);
    console.log(err);
  }
});

if (!module.parent) 
  app.listen(process.env.PORT || PORT, () => 
    console.log(`pid: ${process.pid}; port: ${process.env.PORT || PORT}`));
