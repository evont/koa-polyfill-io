# Koa-polyfill-service

本项目是基于[polyfill.io](https://polyfill.io/v3/) 进行封装的一个Koa 中间件，由于[polyfill.io](https://polyfill.io/v3/) 在国内访问不稳定，会出现请求过久的问题，因此为方便使用，封装了此中间件。

## 安装
``` bash
npm install koa-polyfill-service
```

## 使用
```javascript
const koa = require('koa');
const polyfillMiddleWare = require('koa-polyfill-service');
const koaRouter = require('koa-router');

const app = new koa();
const router = koaRouter();

router.get('/v3/polyfill.min.js', polyfillMiddleWare);
router.get('/v3/polyfill.js', polyfillMiddleWare);
app.use(router.routes());
app.listen(8080);
```