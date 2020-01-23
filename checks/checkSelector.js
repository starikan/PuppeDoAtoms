const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { selector } = this.selectors;
  const element = await this.getElement(this.page, selector);

  this.log({ text: `Check selector exist: '${selector}'` });

  if (element) {
    this.log({ text: `Селектор найден = ${selector}` });
  } else {
    this.log({ text: `Селектор НЕ найден = ${selector}`, level: 'error' });
  }
  return { exists: !!element };
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, selectors, log, helper, levelIndent } = args;
//     const selector = helper.anyGet(selectors, 'selector');
//     const element = await helper.getElement(page, selector);

//     await log({
//       text: `Проверка наличия селектора = ${selectors.selector}`,
//       screenshot: false,
//       level: 'raw',
//       levelIndent: levelIndent + 1,
//     });

//     if (element) {
//       await log({
//         text: `Селектор найден = ${selector}`,
//         screenshot: false,
//         level: 'raw',
//         levelIndent: levelIndent + 1,
//       });
//       return {
//         exists: true,
//       };
//     } else {
//       await log({
//         text: `Селектор НЕ найден = ${selector}`,
//         screenshot: false,
//         level: 'raw',
//         levelIndent: levelIndent + 1,
//       });
//       return {
//         exists: false,
//       };
//     }
//   },
// };
