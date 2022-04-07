require('should');
import browser from 'browser-env';
import stylish from '../index';

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
        stylish.raw.should.be.Function();
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
