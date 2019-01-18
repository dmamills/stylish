# Stylish

[![codecov.io](https://codecov.io/github/dmamills/stylish/coverage.svg?branch=master)](https://codecov.io/github/dmamills/stylish?branch=master) [![Build Status](https://secure.travis-ci.org/dmamills/stylish.png)](http://travis-ci.org/dmamills/stylish)

A strange but straightforward way to write inline styles.
Can be used with React, almost like you would with the `style` attribute.
Stylish improves on inline styles by allowing you to use `:pseudo`, ` + sibling`, and other more complex selectors.

## Usage

### React
```jsx
import stylish from 'stylish';

const className = stylish({
  'background-color': 'tomato',
  'border': '1px solid tomato'
  ':hover': {
    'background-color': 'white',
    'color': 'white
  },
  '> h1': {
    'color': 'dodgerblue'
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
import stylish from 'stylish';

const className = stylish({
  'background-color': 'tomato',
  'border': '1px solid tomato'
  ':hover': {
    'background-color': 'white',
    'color': 'white
  },
  '> h1': {
    'color': 'dodgerblue'
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
