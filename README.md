# pambda-path

## Installation

```
npm i pambda-serve-static -S
```

## Usage

``` javascript
import { compose, createLambda } from 'pambda';
import { path, combineByPath } from 'pambda-path';

export const handler = createLambda(
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

## Related

- [pambda-router](https://github.com/pambda/pambda-router)

## License

MIT
