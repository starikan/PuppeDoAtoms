const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const templateGen = data => {
  const { name, needData, needSelectors, allowResults, allowOptions, help, description } = data;
  let counter = 1;

  let snippet = {
    scope: 'yaml,plaintext',
    prefix: `ppd_${name}`,
    description: description,
    body: [`- ${name}:`, '    ' + `description: $${counter++}`],
  };

  const genBlock = (data, counter, helpName, prefix, invert = false) => {
    if (data) {
      if (data.length === 1) {
        let mainPart = `${data}: $${counter}`;
        if (invert) {
          mainPart = `$${counter}: ${data}`;
        }
        snippet.body.push(
          `    ${prefix}: { ${mainPart} }${
            help && help[helpName] && help[helpName][data] ? ' # ' + help[helpName][data] : ''
          }`,
        );
        counter += 1;
      } else {
        snippet.body.push(`    ${prefix}:`);
        for (let i = 0; i < data.length; i++) {
          let mainPart = `      ${data[i]}: $${counter}`;
          if (invert) {
            mainPart = `      $${counter}: ${data[i]}`;
          }
          snippet.body.push(
            `${mainPart}${help && help[helpName] && help[helpName][data[i]] ? ' # ' + help[helpName][data[i]] : ''}`,
          );
          counter += 1;
        }
      }
    }

    return counter;
  };

  counter = genBlock(needData, counter, 'data', 'bD');
  counter = genBlock(needSelectors, counter, 'selectors', 'bS');
  counter = genBlock(allowOptions, counter, 'options', 'options');

  if (needData || needSelectors) {
    snippet.body.push('    ' + `if: "true"`);
    snippet.body.push('    ' + `errorIf: "false"`);
  }

  genBlock(allowResults, counter, 'results', 'r', true);

  if (allowResults) {
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
