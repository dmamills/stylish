const UPPERCASE_REGEX = /([A-Z])/g;
const MS_REGEX = /^ms-/;

const randId = () => {
  return Math.random()
    .toString(36)
    .substring(7);
}

const stringify = (selector, arr) => {
  return `${selector} { ${arr.join(" ")} }`;
}

const hyphenateStyleName = (name) => {
  return name
    .replace(UPPERCASE_REGEX, '-$1')
    .toLowerCase()
    .replace(MS_REGEX, '-ms-');
}

const hash = (str) => {
  var hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0;
  }

  return hash;
};

export {
  randId,
  stringify,
  hyphenateStyleName,
  hash
};
