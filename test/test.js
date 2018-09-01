const test = require('tape');
const {
  path,
  mount,
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

test('test mount()', t => {
  t.plan(4);

  const pambda = mount('/foo', next => (event, context, callback) => {
    callback(null, event.path);
  });

  const lambda = pambda((event, context, callback) => {
    callback(null, true);
  });

  lambda({
    path: '/foo/bar',
  }, {}, (err, result) => {
    t.error(err);
    t.equal(result, '/bar');
  });

  lambda({
    path: '/bar',
  }, {}, (err, result) => {
    t.error(err);
    t.equal(result, true);
  });
});
