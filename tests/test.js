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

const simpleStyles = {
  color: 'red'
}

describe('stylish', () => {

    it('stylish should have expected functions', () => {
        stylish.should.be.Function();
        stylish.cache.should.be.Function();
        stylish.clearCache.should.be.Function();
    });

    it('should return a class name', () => {
      const className = stylish(simpleStyles);
      className.should.be.String();
      className.should.startWith('styled-');
    });

    it('should create a style tag', () => {
      const className = stylish(simpleStyles);
      const styleEl = document.head.querySelector('style');
      styleEl.id.should.equal('styled-sheet');
    });

    it('should reuse the same stylesheet', () => {
      const c1 = stylish(simpleStyles);
      const c2 = stylish({ color: 'blue' });
      const styleEls = document.head.querySelectorAll('style');
      styleEls.length.should.equal(1);

      const styleLines = styleEls[0].innerHTML.split('\n');
      styleLines.length.should.equal(2);
      styleLines[0].should.equal(`.${c1} { color: red; }`);
      styleLines[1].should.equal(`.${c2} { color: blue; }`);
    });

    it('should not generate identical styles multiple times.', () => {
      const c1 = stylish(simpleStyles);
      const c2 = stylish(simpleStyles);

      const styleEls = document.head.querySelectorAll('style');
      const styleLines = styleEls[0].innerHTML.split('\n');
      styleLines.length.should.equal(1);
      styleLines[0].should.equal(`.${c1} { color: red; }`);
      c1.should.equal(c2); 
    });

    it('should add the expected styles to the stylesheet', () => {
      const className = stylish(simpleStyles);
      const styleEl = document.head.querySelector('style');
      styleEl.innerHTML.should.equal(`.${className} { color: red; }`);
    });

    it('should handle multiple rules', () => {
      const className = stylish({ color: 'red', 'background-color': 'green'});
      const styleEl = document.head.querySelector('style');
      styleEl.innerHTML.should.equal(`.${className} { color: red; background-color: green; }`);
    });

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

    it('should support camelCase style properties', () => {
      const className = stylish({
        backgroundColor: 'tomato',
        border: '1px solid black',
        borderLeftColor: 'green'
      });
      const styleEl = document.head.querySelector('style');
      const styleLines = styleEl.innerHTML.split('\n');
      styleLines.length.should.equal(1);
      styleLines[0].should.equal(`.${className} { background-color: tomato; border: 1px solid black; border-left-color: green; }`);
    });

    it('cache function should return current cache state', () => {
      const c1 = stylish({ color: 'red' });
      const c2 = stylish({ color: 'red' });
      
      Object.keys(stylish.cache()).length.should.equal(1);

      const c3 = stylish({ color: 'blue' });
      Object.keys(stylish.cache()).length.should.equal(2);
    });

   it('clear cache function should reset cache', () => {
      const c1 = stylish({ color: 'red' });
      
      Object.keys(stylish.cache()).length.should.equal(1);
      stylish.clearCache();

      Object.keys(stylish.cache()).length.should.equal(0);
    });
});
