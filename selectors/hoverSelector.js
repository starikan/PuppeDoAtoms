module.exports = async function atomRun() {
  const { selector } = this.selectors;
  const element = await this.getElement(selector);

  await element.hover(selector);

  await this.log({ text: `Hover selector: '${selector}'`, element });
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, selectors, log, options, helper, levelIndent, _ } = args;
//     const selector = selectors.selector;
//     const screenshot = _.get(options, 'screenshot', true);
//     const element = await helper.getElement(page, selector);

//     await element.hover(selector);

//     await log({
//       text: `Сфокусируемся на селекторе = ${selector}`,
//       screenshot: screenshot,
//       fullpage: false,
//       element: element,
//       level: 'debug',
//       levelIndent: levelIndent + 1,
//     });
//   },
// };
