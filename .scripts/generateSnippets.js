const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const templateGen = data => {
  const { name, needData, needSelectors, allowResults, allowOptions, help } = data;
  let counter = 1;

  let snippet = {
    scope: 'yaml,plaintext',
    prefix: `ppd_${name}`,
    description: help,
    body: [`- ${name}:`, '    ' + `description: $${counter++}`],
  };

  if (needData) {
    if (needData.length === 1) {
      snippet.body.push('    ' + `bD: { ${needData}: $${counter++} }`);
    } else {
      snippet.body.push('    ' + `bD:`);
      for (let i = 0; i < needData.length; i++) {
        snippet.body.push('      ' + `${needData[i]}: $${counter++}`);
      }
    }
  }

  if (needSelectors) {
    if (needSelectors.length === 1) {
      snippet.body.push('    ' + `bS: { ${needSelectors}: $${counter++} }`);
    } else {
      snippet.body.push('    ' + `bS:`);
      for (let i = 0; i < needSelectors.length; i++) {
        snippet.body.push('      ' + `${needSelectors[i]}: $${counter++}`);
      }
    }
  }

  if (allowOptions) {
    if (allowOptions.length === 1) {
      snippet.body.push('    ' + `options: { ${allowOptions}: $${counter++} }`);
    } else {
      snippet.body.push('    ' + `options:`);
      for (let i = 0; i < allowOptions.length; i++) {
        snippet.body.push('      ' + `${allowOptions[i]}: $${counter++}`);
      }
    }
  }

  if (needData || needSelectors) {
    snippet.body.push('    ' + `if: "true"`);
    snippet.body.push('    ' + `errorIf: "false"`);
  }

  if (allowResults) {
    if (allowResults.length === 1) {
      snippet.body.push('    ' + `r: { $${counter++}: ${allowResults} }`);
    } else {
      snippet.body.push('"    ' + `r:"`);
      for (let i = 0; i < allowResults.length; i++) {
        snippet.body.push('      ' + `$${counter++}: ${allowResults[i]}`);
      }
    }
    snippet.body.push('    ' + `rF: ""`);
    snippet.body.push('    ' + `errorIfResult: "false"`);
  }

  return snippet;
};

function walk(dir) {
  const files = fs.readdirSync(dir);
  const yamls = files.filter(v => v.endsWith('.yaml'));
  const yamlsData = yamls.map(v => yaml.safeLoad(fs.readFileSync(v, 'utf8')));
  const snippets = yamlsData.reduce((result, v) => {
    result[`PPD atom ${v.name}`] = templateGen(v);
    return result;
  }, {});

  fs.writeFileSync(path.join(process.cwd(), '.vscode', 'ppd.code-snippets'), JSON.stringify(snippets));
}

console.log(walk('.'));
