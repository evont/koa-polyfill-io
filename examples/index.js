const koa = require('koa');
const polyfillMiddleWare = require('../index');
const koaRouter = require('koa-router');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');

const app = new koa();
app.use(conditional());
app.use(etag());
const router = koaRouter();

router.get('/polyfill.min.js', polyfillMiddleWare);
router.get('/polyfill.js', polyfillMiddleWare);
app.use(router.routes());
app.listen(8080);
