import { stringify, hyphenateStyleName, isKeyframes } from './utils';
import { settings, config } from './config';
const keys = Object.keys;

let cache = {};
let theme = {};

function createOrUpdateStyledNode(content: string) {
  const { styleSheetId } = settings();
  let el = document.getElementById(styleSheetId);
  if (el) {
    el.innerHTML = `${el.innerHTML}\n${content}`;
    return;
  }
  el = document.createElement("style");
  el.setAttribute("id", styleSheetId);
  el.innerHTML = content;
  document.head.appendChild(el);
}

type TimingValues = Record<string, Record<string, string>>
interface GeneratedRules {
  className: string
  cssRules?: string[]
}

function keyframes(className: string, styles: TimingValues) : GeneratedRules {
  const base = `@keyframes ${className} {`;
  const timings = keys(styles).map(timing => {
    const timingValues = styles[timing];
    const timingStyles = keys(timingValues).map(timingStyle => {
      return `${hyphenateStyleName(timingStyle)}: ${timingValues[timingStyle]};`;
    });
      return `${timing} { ${timingStyles.join(' ')} }`;
  });

  return {
    className,
    cssRules: [ `${base} ${timings.join(' ')} }` ]
  };
}

function generateClass(styles) : GeneratedRules {
  const { hash, id, classPrefix } = settings();
  let psuedoStyles = {};
  let hashedStyles = hash(JSON.stringify(styles));

  if(cache[hashedStyles]) {
    return { className: cache[hashedStyles] };
  }

  let className = `${classPrefix}-${id()}`;
  cache[hashedStyles] = className;

  const rootKeys = keys(styles);
  if(rootKeys.length == 1 && isKeyframes(rootKeys[0])) {
    return keyframes(className, styles[rootKeys[0]]);
  }

  function parse(obj, root = '') {
    return keys(obj).reduce((acc, k) => {
      if (typeof obj[k] === "string") {
        acc.push(`${hyphenateStyleName(k)}:`, `${obj[k]};`);
      } else {
        psuedoStyles[`${root}${k}`] = parse(obj[k], `${root}${k}`);
      }
      return acc;
    }, []);
  }

  const mainStyles = parse(styles);
  const selector = `.${className}`;
  const cssRules = [
    stringify(selector, mainStyles),
    ...keys(psuedoStyles).reduce((acc, pseudoSelector) => {
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

/**
* Adds raw css to the stylesheet
* @tutorial raw
* @param {string} str
* @memberof stylish
*/
function raw(str: string) {
  str = str.replace(/\s+/g, " ");
  createOrUpdateStyledNode(str);
}

function isThemeInvocation(test: unknown) : boolean { return typeof test === 'function' }


type ThemeFunction = (theme: Record<string, string>) => StylishArgs;
type StylishArgs = Record<string, any> | Array<Record<string, any>> | ThemeFunction

function stylish(styles: StylishArgs, ...extra: any) {
    if(arguments.length === 1) {
      if(isThemeInvocation(styles)) {
        const fn = styles as ThemeFunction
        styles = fn(theme);
        if(Array.isArray(styles)) {
          //@ts-ignore
          return stylish(...styles);
        }
      }

      const { className, cssRules } = generateClass(styles);
      if(cssRules && cssRules.length > 0) {
        createOrUpdateStyledNode(cssRules.join('\n'));
      }
      return className;
   }

  const { classNames, cssRules } = [].reduce.call(arguments, (acc, s) => {
    const { className, cssRules } = generateClass(s);
    acc.classNames.push(className);
    if(cssRules) {
      acc.cssRules.push(...cssRules);
    }
    return acc;
  }, { classNames: [], cssRules: []});

  if(cssRules.length) {
    createOrUpdateStyledNode(cssRules.join('\n'));
  }

  return classNames;
}

/**
* Gets the current cache object
* @tutorial cache
* @returns {Object} cache
* @memberof stylish
*/
const getCache = () => cache;

/**
* Gets the current theme object
* @tutorial theme
* @returns {Object} theme
* @memberof stylish
*/
const getTheme = () => theme;

/**
* Clears the style object cache
* @tutorial cache
* @memberof stylish
*/
const clearCache = () => { cache = {}; };

/**
* Clears current theme object
* @tutorial theme
* @memberof stylish
*/
const clearTheme = () => { theme = {}; };

/**
 * Creates or overwrites the current theme
 * @param {Object} newTheme
 * @tutorial theme
 * @memberof stylish
 */
const createTheme = newTheme => { theme = newTheme; };


stylish.raw = raw;
stylish.setConfig = config;
stylish.cache = getCache;
stylish.theme = getTheme;
stylish.createTheme = createTheme;
stylish.clearCache = clearCache;
stylish.clearTheme = clearTheme;

export default stylish;
