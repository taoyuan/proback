'use strict';

var assert = require('chai').assert;
var proback = require('..');

function fn(throws, cb) {
  if (typeof throws === 'function') {
    cb = throws;
    throws = null;
  }
  cb = cb || proback();
  setTimeout(function () {
    if (throws) {
      cb(throws);
    } else {
      cb();
    }
  });
  return cb.promise;
}

describe('proback', function () {
  it('should callback ok', function (done) {
    fn(done);
  });

  it('should callback with error', function (done) {
    fn('abc', function (err) {
      assert.equal('abc', err);
      done();
    });
  });

  it('should resolve promise', function (done) {
    fn().then(done);
  });

  it('should reject with error', function (done) {
    fn('abc').catch(function (err) {
      assert.equal('abc', err);
      done();
    });
  });
});
