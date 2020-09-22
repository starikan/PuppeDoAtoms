module.exports = async function atomRun() {
  const { selector } = this.selectors;
  const { attribute } = this.data;
  const element = await this.getElement(selector);

  const attributeValue = await this.page.evaluate(
    (element, attribute) => {
      return element.getAttribute(attribute);
    },
    element,
    attribute,
  );

  await this.log({
    text: `Get attribute: '${attribute}' from selector: '${selector}' with result: '${attributeValue}'`,
    element,
  });

  return { attributeValue };
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, selectors, data, log, options, helper, levelIndent, _ } = args;
//     const selector = helper.anyGet(selectors, 'selector');
//     const screenshot = _.get(options, 'screenshot', false);
//     const attr = helper.anyGet(data, 'attribute');
//     const element = await helper.getElement(page, selector);

//     const attrValue = await page.evaluate(
//       (element, attr) => {
//         return element.getAttribute(attr);
//       },
//       element,
//       attr,
//     );

//     await log({
//       text: `Получен атрибут ${attr} на селекторе = ${selector}`,
//       screenshot: screenshot,
//       fullpage: false,
//       element: element,
//       level: 'debug',
//       levelIndent: levelIndent + 1,
//     });

//     return {
//       attributeValue: attrValue,
//     };
//   },
// };
