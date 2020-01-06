const instance = new (require('../Atom'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { selector } = this.selectors;
  const { count = 1, delay = 1, button = 'left' } = this.options;
  const element = await this.getElement(this.page, selector);

  this.log({ text: `Click selector: '${selector}'`, element });

  for (let i = 0; i < count; i++) {
    await element.click({ delay, button });
  }
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, selectors, log, options, helper, levelIndent } = args;
//     const selector = helper.anyGet(selectors, 'selector');
//     const element = await helper.getElement(page, selector);
//     const { screenshot = false, fullpage = false, count = 1, delay = 1, button = 'left' } = options;

//     await log({
//       text: `Нажат селектор = ${selector}`,
//       screenshot: screenshot,
//       fullpage: fullpage,
//       element: element,
//       level: 'debug',
//       levelIndent: levelIndent + 1,
//     });

//     for (let i=0; i < count; i++) {
//       await element.click({ delay, button });
//     }
//   },
// };
