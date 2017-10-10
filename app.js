const Koa = require('koa');
const KoaRouter = require('koa-router');
const koaBody = require('koa-bodyparser');
const cors = require('kcors');
const mongoose = require('koa-mongoose');
const json = require('koa-json');
const { Builder, Nuxt } = require('nuxt');

const config = require('./nuxt.config.js');
const genericCRUD = require('./server/generic.js');

const app = new Koa();
app.use(cors());
const router = new KoaRouter();
const nuxt = new Nuxt(config);

// Build only in dev mode
if (nuxt.options.dev) {
  new Builder(nuxt)
  .build()
  .catch((error) => {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  });
}

app.use(mongoose({
  username: '',
  password: '',
  host: '127.0.0.1',
  port: 27017,
  database: 'babyfoo',
  schemas: `${__dirname}/schemas`,
  db: {
    native_parser: true,
  },
  server: {
    poolSize: 5,
  },
}));

app.use(json());
app.use(koaBody());
router.use('/api/users', genericCRUD('User').routes());
router.use('/api/scores', genericCRUD('Score').routes());

app.use(router.routes());
app.use(router.allowedMethods());

app.use((ctx) => {
  ctx.status = 200; // koa defaults to 404 when it sees that status is unset

  // Solves nuxt.js issue #1206 
  return new Promise((resolve, reject) => {
    ctx.res.on('close', resolve);
    ctx.res.on('finish', resolve);
    nuxt.render(ctx.req, ctx.res, (promise) => {
      // nuxt.render passes a rejected promise into callback on error.
      promise.then(resolve).catch(reject);
    });
  });
});

app.listen(3000);
