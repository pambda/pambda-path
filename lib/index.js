const { callbackify } = require('lambda-callbackify');

const path = (path, pambda) => next => {
  next = callbackify(next);

  return (event, context, callback) => {
    const lambda = path === event.path ? pambda(next) : next;

    return lambda(event, context, callback);
  };
};

const mount = (basePath, pambda) => next => {
  next = callbackify(next);

  return (event, context, callback) => {
    let { path = '' } = event;

    if (!path.startsWith(basePath)) {
      return next(event, context, callback);
    }

    path = path.substr(basePath.length);

    if (!path.startsWith('/')) {
      path = '/' + path;
    }

    event = Object.assign({}, event);
    event.path = path;

    pambda(next)(event, context, callback);
  };
};

const combineByPath = options => next => {
  next = callbackify(next);

  return (event, context, callback) => {
    const pambda = options[event.path];
    const lambda = pambda ? pambda(next) : next;

    return lambda(event, context, callback);
  };
};

/*
 * Exports.
 */
exports.path = path;
exports.mount = mount;
exports.combineByPath = combineByPath;
