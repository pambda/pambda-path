const test = require('tape');
const {
  path,
  combineByPath,
} = require('..');

test('test path()', t => {
  t.plan(4);

  const pambda = path('/foo', next => (event, context, callback) => {
    callback(null, 'foo');
  });

  const lambda = pambda((event, context, callback) => {
    callback(null, 'bar');
  });

  lambda({
    path: '/foo',
  }, {}, (err, result) => {
    t.error(err);
    t.equal(result, 'foo');
  });

  lambda({
    path: '/bar',
  }, {}, (err, result) => {
    t.error(err);
    t.equal(result, 'bar');
  });
});
