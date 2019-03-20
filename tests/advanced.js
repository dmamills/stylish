"use strict";

import should from 'should';
import browser from 'browser-env';
import stylish from '../';

beforeEach(() => {
  browser();
});

afterEach(() => {
  stylish.clearCache();
});

describe('stylish advanced selectors', () => {
    it('should create rules for pseudo selectors', () => {
      const className = stylish({
        color: 'red',
        ':hover': {
          color: 'green'
        },
        ':first-child': {
          color: 'blue'
        }
      });

      const styleEl = document.head.querySelector('style');
      const styleLines = styleEl.innerHTML.split('\n');
      styleLines.length.should.equal(3);
      styleLines[1].should.equal(`.${className}:hover { color: green; }`);
      styleLines[2].should.equal(`.${className}:first-child { color: blue; }`);
    });

    it('should create rules for attribute selectors', () => {
      const className = stylish({
        color: 'red',
        '[role="foo"]': {
          color: 'green'
        }
      });

      const styleEl = document.head.querySelector('style');
      const styleLines = styleEl.innerHTML.split('\n');
      styleLines.length.should.equal(2);
      styleLines[1].should.equal(`.${className}[role="foo"] { color: green; }`);
    });

    it('should create rules for sibling selectors', () => {
      const className = stylish({
        color: 'tomato',
        ' + p': {
          color: 'dodgerblue'
        },
        ' ~ p': {
          'border-color': 'crimson'
        }
      });
      const styleEl = document.head.querySelector('style');
      const styleLines = styleEl.innerHTML.split('\n');
      styleLines.length.should.equal(3);
      styleLines[1].should.equal(`.${className} + p { color: dodgerblue; }`);
      styleLines[2].should.equal(`.${className} ~ p { border-color: crimson; }`);
    });

    it('should create rules for child selectors', () => {
      const className = stylish({
        color: 'tomato',
        ' p': {
          color: 'dodgerblue'
        },
        ' > p': {
          color: 'crimson'
        }
      });
      const styleEl = document.head.querySelector('style');
      const styleLines = styleEl.innerHTML.split('\n');
      styleLines.length.should.equal(3);
      styleLines[1].should.equal(`.${className} p { color: dodgerblue; }`);
      styleLines[2].should.equal(`.${className} > p { color: crimson; }`);
    });

    it('should create psuedo selectors for varadic calls', () => {
      const [c1, c2, c3] = stylish({ color: 'red' }, {
        color: 'blue',
        ':hover': {
          color: 'yellow'
        }
      }, {
        color: 'green',
        ':hover': {
          color: 'yellow'
        }
      });
      const styleEl = document.head.querySelector('style');
      const styleLines = styleEl.innerHTML.split('\n');
      styleLines.length.should.equal(5);
      styleLines[1].should.equal(`.${c2} { color: blue; }`);
      styleLines[2].should.equal(`.${c2}:hover { color: yellow; }`);
      styleLines[3].should.equal(`.${c3} { color: green; }`);
      styleLines[4].should.equal(`.${c3}:hover { color: yellow; }`);
    });
});
