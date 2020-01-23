const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { input } = this.selectors;
  const { text } = this.data;
  const element = await this.getElement(this.page, input);
  await element.type(text);

  this.log({ text: `Type in selector: '${input}', text: '${text}'`, element });
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, data, selectors, options, log, helper, levelIndent, _ } = args;
//     const selector = selectors.input;
//     const screenshot = _.get(options, 'screenshot', false);
//     const text = data.text;
//     const element = await helper.getElement(page, selector);
//     await element.type(text);

//     await log({
//       text: `Ввод текста в INPUT = ${selector}, TEXT = ${text}`,
//       screenshot: screenshot,
//       fullpage: false,
//       element: element,
//       level: 'debug',
//       levelIndent: levelIndent + 1,
//     });
//   },
// };
