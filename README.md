# [stylish](https://dmamills.github.io/stylish/)

[![Github](https://img.shields.io/github/stars/dmamills/stylish?style=social)](https://github.com/dmamills/stylish)
[![codecov.io](https://codecov.io/github/dmamills/stylish/coverage.svg?branch=master)](https://codecov.io/github/dmamills/stylish?branch=master)
[![Build Status](https://secure.travis-ci.org/dmamills/stylish.png)](http://travis-ci.org/dmamills/stylish)
![Package Size](https://img.shields.io/bundlephobia/minzip/@dmamills/stylish.svg?style=flat-square)
![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)

stylish is a lightweight framework for writing css-in-js. It's completely framework agnostic and provides the flexibility of using javascript objects without comprimising your ability to use `:pseudo`, ` + sibling`, and other more complex selectors.

## how it works

stylish maintains a single stylesheet, which it adds to your document's `head`.
When stylish is invoked, it parses the provided styles and converts the object to CSS rules.
Those rules are then appended to the generated stylesheet.
The class name returned from the function can then be used on any DOM element.
stylish is completey framework agnostic.

see the full documentation [here](https://dmamills.github.io/stylish)

## basic example

```javascript
import stylish from '@dmamills/stylish';

const className = stylish({
  backgroundColor: 'tomato',
  border: '1px solid tomato',
  ':hover': {
    backgroundColor: 'white',
    color: 'white'
  }
});

const el = document.createElement('div');
el.classList.add(className);
```

## dev

```
npm test
npm run coverage
```

## examples

- [opensourceradio](http://radio.yomills.com) the project that caused this repo to be made
- [the lil' benchmarker](https://dmamills.github.io/stylish-benchmark-demo) a small example app built for testing the performance of stylish 
- [svelte + stylish sandbox](https://codesandbox.io/s/svelte-stylish-z0ywf) a codesand box using svelte + stylish, showcasing basic usage

## license

Copyright (c) 2020 Daniel Mills. https://yomills.com

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
