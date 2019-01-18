const CLASS_PREFIX = 'styled';
const STYLESHEET_ID = 'styled-sheet';
import { randId, stringify, hyphenateStyleName, hash } from './utils';

let cache = {};

function createOrUpdateStyledNode(content) {
  let el = document.getElementById(STYLESHEET_ID);
  if (el) {
    el.innerHTML = `${el.innerHTML}\n${content}`;
  } else {
    let el = document.createElement("style");
    el.setAttribute("id", STYLESHEET_ID);
    el.innerHTML = content;
    document.head.appendChild(el);
  }
}

function stylish(styles) {
  let psuedoStyles = {};
  let hashedStyles = hash(JSON.stringify(styles));

  if(cache[hashedStyles]) {
    return cache[hashedStyles];
  }

  let className = `${CLASS_PREFIX}-${randId()}`;
  cache[hashedStyles] = className;

  function parse(obj) {
    return Object.keys(obj).reduce((acc, k) => {
      if (typeof obj[k] === "string") {
        acc.push(`${hyphenateStyleName(k)}: ${obj[k]};`);
      } else {
        psuedoStyles[k] = parse(obj[k]);
      }
      return acc;
    }, []);
  }

  const mainStyles = parse(styles);
  const selector = `.${className}`;
  const cssRules = [
    stringify(selector, mainStyles),
    ...Object.keys(psuedoStyles).reduce((acc, pseudoSelector) => {
      let sel = `${selector}${pseudoSelector}`;
      acc.push(stringify(sel, psuedoStyles[pseudoSelector]));
      return acc;
    }, [])
  ];

  createOrUpdateStyledNode(cssRules.join('\n'));

  return className;
}

stylish.__proto__.cache = () => cache;
stylish.__proto__.clearCache = () => {
  cache = {};
}

export default stylish;
