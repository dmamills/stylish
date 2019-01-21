import { hash, id } from './utils';

const DEFAULT_OPTIONS = {
  classPrefix: 'stylish',
  styleSheetId: 'stylish-sheet',
  id,
  hash
};

let currentSettings = {};

function config(options) {
  currentSettings = Object.assign({}, DEFAULT_OPTIONS, options);
}

config();

const settings = () => currentSettings;

export {
  settings,
  config
} 
