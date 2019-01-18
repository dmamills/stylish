"use strict";

import should from 'should';
import browser from 'browser-env';
import stylish from '../';

beforeEach(() => {
  browser();
});

const simpleStyles = {
  color: 'red'
}

describe('stylish', () => {
    it('stylish should be a function', () => {
        stylish.should.be.Function();
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

      const styleLines = styleEls[0].innerText.split('\n');
      styleLines.length.should.equal(2);
      styleLines[0].should.equal(`.${c1} { color: red; }`);
      styleLines[1].should.equal(`.${c2} { color: blue; }`);
    });

    it('should add the expected styles to the stylesheet', () => {
      const className = stylish(simpleStyles);
      const styleEl = document.head.querySelector('style');
      styleEl.innerText.should.equal(`.${className} { color: red; }`);
    });

    it('should handle multiple rules', () => {
      const className = stylish({ color: 'red', 'background-color': 'green'});
      const styleEl = document.head.querySelector('style');
      styleEl.innerText.should.equal(`.${className} { color: red; background-color: green; }`);
    });

    it('should create rules for pseudo selectors', () => {
      const className = stylish({ 
        color: 'red',
        ':hover': {
          color: 'green'
        }
      });

      const styleEl = document.head.querySelector('style');
      const styleLines = styleEl.innerText.split('\n');
      styleLines.length.should.equal(2);
      styleLines[1].should.equal(`.${className}:hover { color: green; }`);
    });
});
