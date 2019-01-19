const DEFAULT_OPTIONS = {
  classPrefix: 'stylish',
  stylesheetId: 'stylish-sheet'
};

let currentSettings = {
  classPrefix: DEFAULT_OPTIONS.classPrefix,
  styleSheetId: DEFAULT_OPTIONS.stylesheetId
}

function config(options) {
  currentSettings = Object.assign({}, DEFAULT_OPTIONS, options);
}

const settings = () => currentSettings;

export {
  settings,
  config
} 
