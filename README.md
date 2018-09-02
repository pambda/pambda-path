# pambda-path

## Installation

```
npm i pambda-path
```

## Usage

``` javascript
const { compose, createLambda } = require('pambda');
const { path, combineByPath } = require('pambda-path');

exports.handler = createLambda(
  compose(
    path('/', next => (event, context, callback) => {
      // Render top page.
    }),
    combineByPath({
      '/foo': next => (event, context, callback) => {
        // Do something.
      }),
      '/bar': next => (event, context, callback) => {
        // Do something.
      }),
    }),
  )
);
```

## path(path, pambda)

Generate a pambda that runs a specified pambda only if a path of an event exactly matches to a specified path.

- `path`
- `pambda`
    - A pambda function that is executed if a path matched.

## Related

- [pambda-router](https://github.com/pambda/pambda-router)

## License

MIT
