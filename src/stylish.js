import { randId, stringify, hyphenateStyleName, hash } from './utils';
import { settings, config } from './config';

let cache = {};

function createOrUpdateStyledNode(content) {
  const { styleSheetId } = settings();
  let el = document.getElementById(styleSheetId);
  if (el) {
    el.innerHTML = `${el.innerHTML}\n${content}`;
  } else {
    let el = document.createElement("style");
    el.setAttribute("id", styleSheetId);
    el.innerHTML = content;
    document.head.appendChild(el);
  }
}
function generateClass(styles) {
  let psuedoStyles = {};
  let hashedStyles = hash(JSON.stringify(styles));

  if(cache[hashedStyles]) {
    return { className: cache[hashedStyles] };
  }

  let className = `${settings().classPrefix}-${randId()}`;
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

  return {
    className,
    cssRules
  };
}

function stylish(styles) {
   if(arguments.length === 1) {
      const { className, cssRules } = generateClass(styles);
      if(cssRules && cssRules.length > 0) {
        createOrUpdateStyledNode(cssRules.join('\n'));
      }
      return className;
   }

  const { classNames, cssRules } = [].reduce.call(arguments, (acc, s) => {
    const { className, cssRules } = generateClass(s);
    acc.classNames.push(className);
    if(cssRules) acc.cssRules.push(cssRules);
    return acc;
  }, { classNames: [], cssRules: []});

  if(cssRules.length > 0) {
    createOrUpdateStyledNode(cssRules.join('\n'));
  }

  return classNames;
}

stylish.__proto__.setConfig = config;
stylish.__proto__.cache = () => cache;
stylish.__proto__.clearCache = () => {
  cache = {};
}

export default stylish;
