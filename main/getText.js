const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { selector } = this.selectors;
  const element = await this.getElement(selector);

  if (element) {
    const { tagName, innerText, value } = await this.page.evaluate(element => {
      return { tagName: element.tagName, innerText: element.innerText, value: element.value };
    }, element);

    let text = innerText;

    // Select fetch data
    if (value && !text && tagName === 'SELECT') {
      const selectorSelect = `${selector} > option[value = "${value}"]`;
      const elementSelect = await this.getElement(selectorSelect);
      text = await this.page.evaluate(element => element.label, elementSelect);
    }

    // Input
    if (value && !text && tagName === 'INPUT') {
      text = value;
    }

    await this.log({ text: `Get text: '${text}' from selector: '${selector}'`, element });

    return { text };
  } else {
    throw { message: `Can't find selector: '${selector}'` };
  }
};

// module.exports = {
//   runTest: async function(args) {
//     let selector, screenshot, element, attr, text, value, selectorSelect, elementSelect, tagName;
//     try {
//       const { page, selectors, data, log, options, helper, levelIndent, _ } = args;
//       selector = helper.anyGet(selectors, 'selector');
//       screenshot = _.get(options, 'screenshot', false);
//       attr = helper.anyGet(data, 'attribute');
//       element = await helper.getElement(page, selector);

//       if (element) {
//         ({ tagName, text, value } = await page.evaluate(element => {
//           return { tagName: element.tagName, text: element.innerText, value: element.value };
//         }, element));

//         // Select fetch data
//         if (value && !text && tagName === 'SELECT') {
//           selectorSelect = selector + ` > option[value = "${value}"]`;
//           elementSelect = await helper.getElement(page, selectorSelect);
//           text = await page.evaluate(element => {
//             return element.label;
//           }, elementSelect);
//         }

//         // Input
//         if (value && !text && tagName === 'INPUT') {
//           text = value;
//           value = '';
//         }
//       } else {
//         throw { message: `Can't find selector ${selector}` };
//       }

//       await log({
//         text: `Get text: '${text}' from selector: '${selector}'`,
//         screenshot: screenshot,
//         fullpage: false,
//         element: element,
//         level: 'debug',
//         levelIndent: levelIndent + 1,
//       });

//       return { text, value };
//     } catch (error) {
//       error.testType = 'atom';
//       error.testArgs = args;
//       error.testVars = { selector, screenshot, element, attr, text, value, selectorSelect, elementSelect, tagName };
//       throw error;
//     }
//   },
// };
