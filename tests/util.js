"use strict";
import should from 'should';
import browser from 'browser-env';
import stylish from '../';

beforeEach(() => {
  browser();
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

    it('should return current themes state', () => {
      stylish.createTheme({ brandColor: 'red'});
      stylish.theme().should.deepEqual({ brandColor: 'red' });
    });

    it('should reset theme when clearTheme called', () => {
      stylish.createTheme({ brandColor: 'red' });
      stylish.theme().should.deepEqual({ brandColor: 'red' });
      stylish.clearTheme();
      stylish.theme().should.deepEqual({});
    });
});

