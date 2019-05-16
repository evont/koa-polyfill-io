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
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');

const app = new koa();
// 用于缓存请求
app.use(conditional());
app.use(etag());
const router = koaRouter();

router.get('/polyfill.min.js', polyfillMiddleWare); // 将开启压缩
router.get('/polyfill.js', polyfillMiddleWare); // 无压缩返回
app.use(router.routes());
app.listen(8080);
```

## 说明

当请求以`min.js` 结尾时会压缩代码

可使用以下参数：

- `flags`
  
  以下属性值可使用`%7C`(即`|`) 分隔使用， 如`flags=gated%7Calways`

  `gated`: 对每个polyfill 进行特性检测，即仅在原生Api 不支持的情况下进行 polyfill

  `always`: 包含所有polyfill 方法，无论当前请求的浏览器是否需要

- `callback`
   
  当polyfill 文件加载完成后执行的回调函数

- `features`

  参考可用的[polyfill 列表及对应包含的api](https://polyfill.io/v3/url-builder/)
