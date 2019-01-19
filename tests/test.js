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

    it('should should have expected functions', () => {
        stylish.should.be.Function();
        stylish.cache.should.be.Function();
        stylish.clearCache.should.be.Function();
        stylish.setConfig.should.be.Function();
    });

    it('should return a class name', () => {
      const className = stylish(simpleStyles);
      className.should.be.String();
      className.should.startWith('stylish-');
    });

    it('should create a style tag', () => {
      const className = stylish(simpleStyles);
      const styleEl = document.head.querySelector('style');
      styleEl.id.should.equal('stylish-sheet');
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

    it('should not generate identical styles multiple times.', () => {
      const c1 = stylish(simpleStyles);
      const c2 = stylish(simpleStyles);

      const styleEls = document.head.querySelectorAll('style');
      const styleLines = styleEls[0].innerHTML.split('\n');
      styleLines.length.should.equal(1);
      styleLines[0].should.equal(`.${c1} { color: red; }`);
      c1.should.equal(c2); 
    });

    it('should accept multiple objects to batch generate styles', () => {
      const classNames = stylish({
        color: 'red'
      }, {
        color: 'blue'
      });

      classNames.should.be.Array();
      classNames.length.should.equal(2);
      const styleEl = document.head.querySelector('style');

      const styleLines = styleEl.innerHTML.split('\n');
      styleLines.length.should.equal(2);
      styleLines[0].should.equal(`.${classNames[0]} { color: red; }`);
      styleLines[1].should.equal(`.${classNames[1]} { color: blue; }`);
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
});

describe('stylish utilities', () => {

    it('should return current caches state', () => {
      const c1 = stylish({ color: 'red' });
      const c2 = stylish({ color: 'red' });
      
      Object.keys(stylish.cache()).length.should.equal(1);
      Object.values(stylish.cache())[0].should.equal(c1);

      const c3 = stylish({ color: 'blue' });
      Object.keys(stylish.cache()).length.should.equal(2);
      Object.values(stylish.cache())[1].should.equal(c3);
    });

   it('should reset cache when clearCache called', () => {
      const c1 = stylish({ color: 'red' });
      
      Object.keys(stylish.cache()).length.should.equal(1);
      stylish.clearCache();

      Object.keys(stylish.cache()).length.should.equal(0);
    });
});


describe('stylish config', () => {

  it('should allow stylesheet id to be customized', () => {
    stylish.setConfig({
      styleSheetId: 'custom-id'
    });
  
    const className = stylish(simpleStyles);
    const styleEl = document.head.querySelector('style');
    styleEl.id.should.equal('custom-id');
  });

  it('should allow class name prefix to be customized', () => {
    stylish.setConfig({
      classPrefix: 'custom'
    });
  
    const className = stylish(simpleStyles);
    className.should.startWith('custom-');
  });


});
