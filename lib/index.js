const path = (path, pambda) => next =>
  (event, context, callback) => {
    const lambda = path === event.path ? pambda(next) : next;

    return lambda(event, context, callback);
  };

const combineByPath = options => next =>
  (event, context, callback) => {
    const pambda = options[event.path];
    const lambda = pambda ? pambda(next) : next;

    return lambda(event, context, callback);
  };

exports.path = path;
exports.combineByPath = combineByPath;
