import { hash, id } from './utils';

interface StylishSettings {
  classPrefix: string,
  styleSheetId: string,
  id: () => string | number,
  hash: (string) => number
}

const DEFAULT_OPTIONS = {
  classPrefix: 'stylish',
  styleSheetId: 'stylish-sheet',
  id,
  hash
};

let currentSettings = {} as StylishSettings;

/**
* Sets the stylish configuration object
* @tutorial config
* @param {Object} options
* @memberof stylish
*/
function config(options?: Partial<StylishSettings>) {
  currentSettings = Object.assign({}, DEFAULT_OPTIONS, options);
}

config();

const settings = () : StylishSettings => (currentSettings as StylishSettings);

export {
  settings,
  config
};
