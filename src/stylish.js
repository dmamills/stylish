const CLASS_PREFIX = 'styled';
const STYLESHEET_ID = 'styled-sheet';

function createOrUpdateStyledNode(content) {
  let el = document.getElementById(STYLESHEET_ID);
  if (el) {
    el.innerText = `${el.innerText}\n${content}`;
  } else {
    let el = document.createElement("style");
    el.setAttribute("id", STYLESHEET_ID);
    el.innerText = content;
    document.head.appendChild(el);
  }
}

const randId = () => Math.random().toString(36).substring(7);

function stylish(styles) {
  let className = `${CLASS_PREFIX}-${randId()}`;
  let psuedoStyles = {};
  let mainStyles = [];


  function parse(obj) {
    let a = [];

    for (let k in obj) {
      if (typeof obj[k] === "string") {
        a.push(`${k}: ${obj[k]};`);
      } else {
        psuedoStyles[k] = parse(obj[k]);
      }
    }
    return a;
  }

  function stringify(selector, arr) {
    return `${selector} { ${arr.join(" ")} }`;
  }

  mainStyles = parse(styles);
  const sel = `.${className}`;

  let strs = [stringify(sel, mainStyles)];
  for (let pseudoSelector in psuedoStyles) {
    const psuedoStr = stringify(
      `${sel}${pseudoSelector}`,
      psuedoStyles[pseudoSelector]
    );
    strs.push(psuedoStr);
  }

  createOrUpdateStyledNode(strs.join('\n'));

  return className;
}

export default stylish;
