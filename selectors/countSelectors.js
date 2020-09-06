const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { selector } = this.selectors;
  const { timeDelay } = this.options;

  if (timeDelay) {
    await this.page.waitFor(timeDelay);
  }

  await this.log({ text: `Counting selectors: '${selector}'` });
  const elements = await this.getElement(selector, true);
  await this.log({ text: `Selectors '${selector}' found '${elements.length}'` });

  return { count: elements.length };
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, selectors, options, log, helper, levelIndent } = args;
//     const selector = helper.anyGet(selectors, 'selector');

//     const timeDelay = helper.anyGet(options, 'timeDelay');
//     if (timeDelay) {
//       await page.waitFor(timeDelay);
//     }

//     await log({
//       text: `Подсчет количества селекторов = ${selectors.selector}`,
//       screenshot: false,
//       level: 'raw',
//       levelIndent: levelIndent + 1,
//     });

//     const elements = await helper.getElement(page, selector, true);

//     await log({
//       text: `Селекторов ${selectors.selector} найдено = ${elements.length}`,
//       screenshot: false,
//       level: 'raw',
//       levelIndent: levelIndent + 1,
//     });

//     return {
//       count: elements.length,
//     };
//   },
// };
