const UPPERCASE_REGEX = /([A-Z])/g;
const MS_REGEX = /^ms-/;
const KEYFRAMES_REGEX = /^@keyframes/;

const id = () : string => {
  return Math.random()
    .toString(36)
    .substring(7);
};

const stringify = (selector: string, arr: string[]) : string => {
  return `${selector} { ${arr.join(" ")} }`;
};

const hyphenateStyleName = (name: string) : string => {
  return name
    .replace(UPPERCASE_REGEX, '-$1')
    .toLowerCase()
    .replace(MS_REGEX, '-ms-');
};

const hash = (str: string): number => {
  var hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0;
  }

  return hash;
};

const isKeyframes = (str: string) : boolean => {
  return KEYFRAMES_REGEX.test(str);
};

export {
  id,
  stringify,
  hyphenateStyleName,
  hash,
  isKeyframes
};
