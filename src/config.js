import { hash, id } from './utils';

const DEFAULT_OPTIONS = {
  classPrefix: 'stylish',
  styleSheetId: 'stylish-sheet',
  id,
  hash
};

let currentSettings = {};

/**
* Sets the stylish configuration object
* @tutorial config 
* @param {Object} options
* @memberof stylish
*/
function config(options) {
  currentSettings = Object.assign({}, DEFAULT_OPTIONS, options);
}

config();

const settings = () => currentSettings;

export {
  settings,
  config
} 
