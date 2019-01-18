const CLASS_PREFIX = 'styled';
const STYLESHEET_ID = 'styled-sheet';

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

const randId = () => Math.random().toString(36).substring(7);
const stringify = (selector, arr) => `${selector} { ${arr.join(" ")} }`;

function stylish(styles) {
  let className = `${CLASS_PREFIX}-${randId()}`;
  let psuedoStyles = {};

  function parse(obj) {
    return Object.keys(obj).reduce((acc, k) => {
      if (typeof obj[k] === "string") {
        acc.push(`${k}: ${obj[k]};`);
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

export default stylish;
