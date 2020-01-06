const path = require('path');
const Atom = require('./Atom');

const ATOMS_PATHS = ['./main', './checks', './modify', './files', './blank', './mouse', './checks'];

const resolvedPaths = ATOMS_PATHS.map(v => path.resolve(__dirname, v));

for (let path in resolvedPaths) {
  if (!process.env.PPD_ROOT_ADDITIONAL) {
    process.env.PPD_ROOT_ADDITIONAL = path;
  } else if (!process.env.PPD_ROOT_ADDITIONAL.includes(path)) {
    process.env.PPD_ROOT_ADDITIONAL += ',' + path;
  }
}

module.exports = { Atom };