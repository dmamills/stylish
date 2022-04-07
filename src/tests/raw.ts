import browser from 'browser-env';
import stylish from '../index';

beforeEach(() => {
  browser();
});

afterEach(() => {
  stylish.clearCache();
});

describe('stylish raw insert', () => {
  const expected1 = ' body { color: red; } article { font-size: 1.6rem; } ';
  const expected2 = ' @media screen and (max-width: 600px){ article { flex-direction: column; } } ';

  it('should insert raw css', () => {
    stylish.raw(`
      body {
        color: red;
      }
      article {
        font-size: 1.6rem;
      }
    `);

    stylish.raw(`
      @media screen and (max-width: 600px){
        article {
          flex-direction: column;
        }
      }
    `)

    const styleEls = document.head.querySelectorAll('style');
    const styleLines = styleEls[0].innerHTML.split('\n');
    styleLines[0].should.equal(expected1);
    styleLines[1].should.equal(expected2);
    styleLines.length.should.equal(2);
  });
});
