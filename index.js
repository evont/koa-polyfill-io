'use strict';

const compressBundle = require('./lib/compress-bundle');
const getPolyfillParameters = require('./lib/get-polyfill-parameters');
// const latestVersion = require('polyfill-library/package.json').version;
const polyfillio = require('polyfill-library');
// const polyfillio_3_27_4 = require('polyfill-library-3.27.4');
// const polyfillio_3_25_3 = require('polyfill-library-3.25.3');
// const polyfillio_3_25_1 = require('polyfill-library-3.25.1');
// const polyfillio_3_28_1 = require('polyfill-library-3.28.1');

async function respondWithBundle(context, params, bundle) {
  const file = await compressBundle(params.compression, bundle);
  const headers = {
    'Cache-Control':
      'public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800',
    'Content-Type': 'text/javascript; charset=utf-8',
    'surrogate-key': 'polyfill-service'
  };
  if (params.compression) {
    headers['Content-Encoding'] = params.compression;
  }
  context.body = file;
}

async function polyfillSevice(context, next) {
  await next()
  const params = getPolyfillParameters(context);
  const bundle = await polyfillio.getPolyfillString(params);
  await respondWithBundle(context, params, bundle);
}
exports = module.exports = polyfillSevice;