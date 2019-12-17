const path = require('path');

const ATOMS_PATH = './atoms';

const resolvedPath = path.resolve(ATOMS_PATH);

if (!process.env.PPD_ROOT_ADDITIONAL) {
  process.env.PPD_ROOT_ADDITIONAL = resolvedPath;
} else if (!process.env.PPD_ROOT_ADDITIONAL.includes(resolvedPath)) {
  process.env.PPD_ROOT_ADDITIONAL += ',' + resolvedPath;
}
