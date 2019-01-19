# Stylish

[![codecov.io](https://codecov.io/github/dmamills/stylish/coverage.svg?branch=master)](https://codecov.io/github/dmamills/stylish?branch=master) [![Build Status](https://secure.travis-ci.org/dmamills/stylish.png)](http://travis-ci.org/dmamills/stylish)

A strange but straightforward way to write inline styles.
Can be used with React, almost like you would with the `style` attribute.
Stylish improves on inline styles by allowing you to use `:pseudo`, ` + sibling`, and other more complex selectors.

## Usage

### React
```jsx
import stylish from '@dmamills/stylish';

const className = stylish({
  backgroundColor: 'tomato',
  border: '1px solid tomato'
  ':hover': {
    backgroundColor: 'white',
    color: 'white'
  },
  '> h1': {
    color: 'dodgerblue'
  }
});

function SomeComponent() {
  return (
    <div className={className}>
      <h1>I'm styled!</h1>
    </div>
  );
}
```

### Vue
```js
import stylish from '@dmamills/stylish';

const className = stylish({
  backgroundColor: 'tomato',
  border: '1px solid tomato'
  ':hover': {
    backgroundColor: 'white',
    color: 'white'
  },
  '> h1': {
    color: 'dodgerblue'
  }
});

Vue.component('some-component', {
  template: `
    <div class="${className}">
      <h1>I'm styled!</h1>
    </div>
  `
});
```

## API

stylish exposes a single function that returns the generated class names. it is a variadic function that can take any number of style objects and will batch create them.

```
const single = stylish({ color: 'red' }) // -> "stylish-<id>"
const multiple = stylish({ color: 'red' }, { color: 'blue' }) // -> [ "stylish-<id>", "stylish-<id>" ]

```

stylish also maintains an internal cache to prevent duplication of classes. when stylish is invoked, the style object is stringifed, and then a hash code is generated from that string.

there are two helper functions exposed that deal with this cache. They are mostly used internally for testing.

```
stylish.cache() // => { } returns cache object
stylish.clearCache() // => will reset the internal cache
```

## How it works

Stylish maintains a single stylesheet, which it adds to your document's `head`.
When Stylish is invoked, it parses the provided styles and converts the object to CSS rules.
Those rules are then appended to the generated stylesheet.
The class name returned from the function can then be used on any DOM element.
Stylish is completey framework agnostic.

## Dev

```
npm test
npm run coverage
```


## license

Copyright (c) 2019 Daniel Mills. https://yomills.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
