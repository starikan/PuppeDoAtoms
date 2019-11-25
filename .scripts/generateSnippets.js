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

  const genLine = (data, helpName, invert) => {
    let helpData = help && help[helpName] && help[helpName][data];
    let helpString = '';
    let helpDefault;
    if (typeof helpData === 'string') {
      helpString = ' # ' + help[helpName][data];
    }
    if (typeof helpData === 'object') {
      helpString = ' # ' + help[helpName][data].description;
      helpDefault = help[helpName][data].default;
    }

    if (data.match(/\?/)) {
      data = data.replace(/\?/g, '');
      helpString = helpString === '' ? ' # [optional]' : helpString + ' [optional]'
    }

    let mainPart = `${data}: ${helpDefault ? helpDefault : '$' + counter}`;
    if (invert) {
      mainPart = `$${counter}: ${data}`;
    }
    return { mainPart, helpString };
  };

  const genBlock = (data, counter, helpName, prefix, invert = false) => {
    if (data) {
      if (data.length === 1) {
        const { mainPart, helpString } = genLine(data[0], helpName, invert);
        snippet.body.push(`    ${prefix}: { ${mainPart} }${helpString}`);
        counter += 1;
      } else {
        snippet.body.push(`    ${prefix}:`);
        for (let i = 0; i < data.length; i++) {
          const { mainPart, helpString } = genLine(data[i], helpName, invert);
          snippet.body.push(`      ${mainPart}${helpString}`);
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
  console.log('Done snippets generator.')
}

walk('.');
