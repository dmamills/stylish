import * as should from 'should';
import browser from 'browser-env';
import stylish from '../index';

beforeEach(() => {
  browser();
});

afterEach(() => {
  stylish.clearCache();
});

const keyframeStyles = {
  '@keyframes': {
    from: { backgroundColor: 'red' },
    to: { backgroundColor: 'yellow' },
  }
};

describe('stylish keyframes', () => {

  it('should support keyframes using short hand', () => {
    const className = stylish(keyframeStyles);
    const expected = `@keyframes ${className} { from { background-color: red; } to { background-color: yellow; } }`

    const styleEls = document.head.querySelectorAll('style');
    const styleLines = styleEls[0].innerHTML.split('\n');
    styleLines.length.should.equal(1);
    styleLines[0].should.equal(expected);
  });

  it('should support keyframes using percentages', () => {
    const className = stylish({
      '@keyframes': {
        '0%': { color: 'red' },
        '15%': { color: 'orange' },
        '55%': { color: 'yellow' },
        '100%': { color: 'green' },
      }
    });
    const expected = `@keyframes ${className} { 0% { color: red; } 15% { color: orange; } 55% { color: yellow; } 100% { color: green; } }`

    const styleEls = document.head.querySelectorAll('style');
    const styleLines = styleEls[0].innerHTML.split('\n');
    styleLines.length.should.equal(1);
    styleLines[0].should.equal(expected);
  });

  it('should create multiple keyframes', () => {
    const [ c1, c2 ] = stylish(keyframeStyles, {
      '@keyframes': {
        '0%': { color: 'red' },
        '15%': { color: 'orange' },
        '55%': { color: 'yellow' },
        '100%': { color: 'green' },
      }
    });

    const expected1 = `@keyframes ${c1} { from { background-color: red; } to { background-color: yellow; } }`
    const expected2 = `@keyframes ${c2} { 0% { color: red; } 15% { color: orange; } 55% { color: yellow; } 100% { color: green; } }`

    const styleEls = document.head.querySelectorAll('style');
    const styleLines = styleEls[0].innerHTML.split('\n');
    styleLines.length.should.equal(2);
    styleLines[0].should.equal(expected1);
    styleLines[1].should.equal(expected2);
  });
});

