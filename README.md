# Stylish

[![codecov.io](https://codecov.io/github/dmamills/stylish/coverage.svg?branch=master)](https://codecov.io/github/dmamills/stylish?branch=master) [![Build Status](https://secure.travis-ci.org/dmamills/stylish.png)](http://travis-ci.org/dmamills/stylish)

Stylish is a lightweight framework for writing css-in-js. It's completely framework agnostic and provides the flexibility of using javascript objects without comprimising your ability to use `:pseudo`, ` + sibling`, and other more complex selectors.

## How it works

Stylish maintains a single stylesheet, which it adds to your document's `head`.
When Stylish is invoked, it parses the provided styles and converts the object to CSS rules.
Those rules are then appended to the generated stylesheet.
The class name returned from the function can then be used on any DOM element.
Stylish is completey framework agnostic.

## Basic Example

```javascript
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

const el = document.createElement('div');
el.classList.add(className);
```

## API

Stylish's main function returns the generated class name(s). It is a variadic function that can take any number of style objects and will batch create them.

### main usage

```javascript
const redText = stylish({ color: 'red' }) // -> "stylish-<id>"
const [ redText, blueText ] = stylish({ color: 'red' }, { color: 'blue' }) // -> [ "stylish-<id>", "stylish-<id>" ]
```

### animations

Stylish can be used to create keyframes for animation. You simply need to declare the keyframe first and reference the generated animation name in your future styles.

```javascript
const animation = stylish({
  '@keyframes': {
    '0%': { transform: "scale(0.5)" },
    '100%': { transform: "scale(1.5)" }
  }
})

const box = stylish({
  width: '20px',
  height: '20px',
  backgroundColor: 'red',
  animation: `${animation} 1s infinite`
});

```

### raw css

Stylish also exposes a simple function for adding raw css to the stylesheet

```javascript
stylish.raw(`
  body {
    color: red;
  }
`);
```

### themes

stylish has a function for setting theme variables. Which can be exposed by passing a function to stylish.

```javascript
stylish.createTheme(() => ({
  brandColor: '#1abc9c',
  font: { large: '2rem', small: '0.8rem' }
}));

const [ headerFont, accentFont ] = stylish(({ brandColor, font }) => [
  { color: brandColor, fontSize: font.large },
  { color: brandColor, fontSize: font.small },
]);
```

The theme can be removed using `stylish.clearTheme()` or replaced by invoking `stylish.createTheme({})` again.

### configuration

Stylish also allows for it's settings to be customized by exporting a single function for this. *settings must be overridden before any calls to `stylish` are made.*

```javascript
stylish.config({
  stylesheetId: 'custom-id', //The id assigned to the stylesheet created
  classPrefix: 'custom-prefix', // The prefix that will be used for generated class names
  id: () => {} // function for randomly generating the class ids: <classPrefix>-<id()>
});
```

an example of an overriding the id function:

```javascript
const id = (() => {
  let i = 1;
  return () => i++;
})()
stylish.config({
  id: id
});

const c1 = stylish({ color: 'red' }) // => "stylish-1"
const c2 = stylish({ color: 'blue' }) // => "stylish-2"
```

### cache

Stylish also maintains an internal cache to prevent duplication of classes. when Stylish is invoked, the style object is stringifed, and then a hash code is generated from that string.

there are two helper functions exposed that deal with this cache. They are mostly used internally for testing.

```javascript
stylish.cache() // => { } returns cache object
stylish.clearCache() // => will reset the internal cache
```

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
