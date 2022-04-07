import browser from 'browser-env';
import stylish from '../index';
import { hash } from '../utils';

beforeEach(() => {
  browser();
});

afterEach(() => {
  stylish.clearCache();
});

const simpleStyles = {
  color: 'red'
};

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

  it('should allow for id generation to be customize', () => {
    stylish.setConfig({
      id: (() => {
        let i = 1;
        return () => i++;
      })()
    });

      const c1 = stylish(simpleStyles);
      const c2 = stylish({ color: 'blue' });
      c1.should.equal('stylish-1');
      c2.should.equal('stylish-2');
  });

  it('should not hash empty string', () => {
    hash('').should.equal(0);
  })
});
