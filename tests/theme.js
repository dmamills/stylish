"use strict";

import should from 'should';
import browser from 'browser-env';
import stylish from '../';

beforeEach(() => {
  browser();
});

afterEach(() => {
  stylish.clearCache();
  stylish.clearTheme();
});

const basicTheme = {
  brandColor: '#eee',
  brandFont: 'Helvetica'
};

describe('stylish themes', () => {
    it('should accept a function for creating classes', () => {
      stylish.createTheme(basicTheme);
      const brandHeader = stylish((theme) => ({
        color: theme.brandColor,
        fontFamily: theme.brandFont,
        fontSize: '2rem',
      }));

      const styleEl = document.head.querySelector('style');
      const styleLines = styleEl.innerHTML.split('\n');
      styleLines.length.should.equal(1);
      styleLines[0].should.equal(`.${brandHeader} { color: #eee; font-family: Helvetica; font-size: 2rem; }`);
    });

    it('should accept a function for creating multiple classes', () => {
      stylish.createTheme(basicTheme);
      const [ regular, light, bold ] = stylish(({ brandFont }) => [
        { fontFamily: brandFont },
        { fontFamily: brandFont, fontWeight: '200' },
        { fontFamily: brandFont, fontWeight: '800' },
      ]);

      const styleEl = document.head.querySelector('style');
      const styleLines = styleEl.innerHTML.split('\n');
      styleLines.length.should.equal(3);
      styleLines[0].should.equal(`.${regular} { font-family: Helvetica; }`);
      styleLines[1].should.equal(`.${light} { font-family: Helvetica; font-weight: 200; }`);
      styleLines[2].should.equal(`.${bold} { font-family: Helvetica; font-weight: 800; }`);
    });
});
