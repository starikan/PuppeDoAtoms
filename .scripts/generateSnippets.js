const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const templateGen = (name, needData, needSelectors) => {
  let counter = 1;
  let text = '';

  let snippet = {};

  text += `"PPD atom ${name}": {
    "scope": "yaml,plaintext",
    "prefix": "ppd_${name}",
    "body": [
      "- ${name}:",
      "    description: $${counter}",
  `;
  counter = counter + 1;

  if (needData) {
    if (needData.length === 1) {
      text = text + `"    bD: { ${needData}: $${counter}}",`;
    } else {
      text = text + `"    bD:",`;
      for (let i = 0; i < needData.length; i++) {
        text = text + `"    ${needData[i]}: ${counter}",`;
        counter = counter + 1;
      }
    }
  }

  if (needSelectors) {
    if (needSelectors.length === 1) {
      text = text + `"    bS: { ${needSelectors}: $${counter}}",`;
    } else {
      text = text + `"    bS:",`;
      for (let i = 0; i < needSelectors.length; i++) {
        text = text + `"    ${needSelectors[i]}: ${counter}",`;
        counter = counter + 1;
      }
    }
  }

  text += `],
    "description": "Create PPD Atom ${name}"
  },
  `;

  return text;
};

function walk(dir) {
  const files = fs.readdirSync(dir);
  const yamls = files.filter(v => v.endsWith('.yaml'));
  const yamlsData = yamls.map(v => yaml.safeLoad(fs.readFileSync(v, 'utf8')));
  const snippet = templateGen(yamlsData[0].name, yamlsData[0].needData, yamlsData[0].needSelectors);
  debugger;
  // files.map(async file => {
  //   const filePath = path.join(dir, file);
  //   const stats = await fs.stat(filePath);
  //   if (stats.isDirectory()) return walk(filePath);
  //   else if (stats.isFile()) return filePath;
  // })

  // return files.reduce((all, folderContents) => all.concat(folderContents), []);
}

console.log(walk('.'));
