const koa = require('koa');
const polyfillMiddleWare = require('../index');
const koaRouter = require('koa-router');

const app = new koa();
const router = koaRouter();

router.get('/v3/polyfill.min.js', polyfillMiddleWare);
router.get('/v3/polyfill.js', polyfillMiddleWare);
app.use(router.routes());
app.listen(8080);
