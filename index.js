'use strict';

const compressBundle = require('./lib/compress-bundle');
const getPolyfillParameters = require('./lib/get-polyfill-parameters');
const polyfillio = require('polyfill-library');

async function respondWithBundle(context, params, bundle) {
  const file = await compressBundle(params.compression, bundle);
  const headers = {
    'Cache-Control':
      'max-age=604800, stale-while-revalidate=604800, stale-if-error=604800',
    'Content-Type': 'text/javascript; charset=utf-8',
    'surrogate-key': 'polyfill-service'
  };
  if (params.compression) {
    headers['Content-Encoding'] = params.compression;
  }
  context.set(headers)
  context.body = file;
}

async function polyfillSevice(context, next) {
  await next()
  const params = getPolyfillParameters(context);
  const bundle = await polyfillio.getPolyfillString(params);
  await respondWithBundle(context, params, bundle);
}
exports = module.exports = polyfillSevice;