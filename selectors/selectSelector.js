const instance = new (require('../Atom'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { selector } = this.selectors;
  const { option } = this.data;
  const element = await this.getElement(this.page, selector);

  await this.page.select(selector, option);

  await log({ text: `Selector select: '${selector}'`, element });
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, selectors, data, log, options, helper, levelIndent, _ } = args;
//     const selector = helper.anyGet(selectors, 'selector');
//     const option = helper.anyGet(data, 'option');
//     const screenshot = _.get(options, 'screenshot', true);
//     const element = await helper.getElement(page, selector);

//     await page.select(selector, option);

//     await log({
//       text: `Выбран селектор = ${selector}`,
//       screenshot: screenshot,
//       fullpage: false,
//       element: element,
//       level: 'debug',
//       levelIndent: levelIndent + 1,
//     });
//   },
// };
