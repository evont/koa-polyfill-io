# Koa-polyfill-service

This is a Koa middleware based on [polyfill.io](https://polyfill.io/v3/), which can't be stable visited in mainland & causing request timeout. therefore I create this;

本项目是基于[polyfill.io](https://polyfill.io/v3/) 进行封装的一个Koa 中间件，由于[polyfill.io](https://polyfill.io/v3/) 在国内访问不稳定，会出现请求过久的问题，因此为方便使用，封装了此中间件。

## Install 
``` bash
npm install koa-polyfill-service
```

## Usage
```javascript
const koa = require('koa');
const polyfillMiddleWare = require('koa-polyfill-service');
const koaRouter = require('koa-router');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');

const app = new koa();
// in order to cache request
app.use(conditional());
app.use(etag());
const router = koaRouter();

router.get('/polyfill.min.js', polyfillMiddleWare); // use in min size
router.get('/polyfill.js', polyfillMiddleWare); // use in normal size
app.use(router.routes());
app.listen(8080);
```

## Description

It will minimize code when request with `min.js`

And it's support follow queries:

- `flags`
  
  you can use props below & sperate with `%7C` (`|`), like `flags=gated%7Calways`;

  - `gated`: to identity each polyfill, it will polyfill only if native Api is not supported

  - `always`: include all polyfill function, no matter the browser that current request from is needed

- `features`

  all features available can be seen in [polyfill list & api](https://polyfill.io/v3/url-builder/)
   

- `compression`

  compression bundle with `gzip` (gzip compress), `br` (brotli compress) & `identity` (no compress)

- `ua`

  you can define user-agent yourself, if it's not provied, than the `user-agent` header will be used alternatively


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

- `compression`

  压缩方式，可选为`gzip`、`br` 或者 `identity`

- `ua`
  
   你可以自定义 user agent ，如果不定义，则使用header 中的user-agent
