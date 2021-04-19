'use strict';

const denodeify = require('denodeify');
const zlib = require('zlib');
const brotliCompress = denodeify(zlib.brotliCompress.bind(zlib));
const gzipCompress = denodeify(zlib.gzip.bind(zlib));

module.exports = function compressBundle(compression, file) {
  switch (compression) {
    case 'gzip':
      return gzipCompress(file, {
        level: zlib.constants.Z_BEST_COMPRESSION
      });
    case 'br':
      return brotliCompress(Buffer.from(file), {
        parms: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 4,
        }
      });
    case 'identity':
    default:
      return Promise.resolve(file);
  }
};
