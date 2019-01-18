# stylish

[![codecov.io](https://codecov.io/github/dmamills/stylish/coverage.svg?branch=master)](https://codecov.io/github/dmamills/stylish?branch=master) [![Build Status](https://secure.travis-ci.org/dmamills/stylish.png)](http://travis-ci.org/dmamills/stylish)

a strange but straightforward way to write inline styles. can be used with react almost like you would with the `style` tag, but stylish allows for you to have psuedo and other type of selectors.

## usage

```jsx
import stylish from 'stylish'

const className = stylish({
  'background-color': 'red',
  'border': '1px solid black'
  ':hover': {
    'background-color': 'green'
  },
  '> h1': {
    color: 'white'
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

## how it works

stylish maintains a single stylesheet that it adds to your document's head. when stylish is invoked it parses the object provided to it and converts it css rules that it appends to it's stylesheet. the class name returned from the function can then be used on any dom element, stylish is completed framework agnostic.

## dev

```
npm test
npm run coverage
```
