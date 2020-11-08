const path = require('path');

const ATOMS_PATHS = [
  './src/main',
  './src/checks',
  './src/modify',
  './src/files',
  './src/blank',
  './src/mouse',
  './src/checks',
  './src/cdp',
  './src/selectors',
];

const resolvedPaths = ATOMS_PATHS.map(v => path.resolve(__dirname, v));

for (let path of resolvedPaths) {
  if (!process.env.PPD_ROOT_ADDITIONAL) {
    process.env.PPD_ROOT_ADDITIONAL = path;
  } else if (!process.env.PPD_ROOT_ADDITIONAL.includes(path)) {
    process.env.PPD_ROOT_ADDITIONAL += ',' + path;
  }
}
