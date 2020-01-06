const instance = new (require('../Atom'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { css } = this.data;
  await this.page.addStyleTag({ content: css });
  this.log({ text: `CSS inject on the page: ${css}` });
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, data, log, levelIndent, _ } = args;

//     const css = _.get(data, 'css');

//     await page.addStyleTag({ content: css });
//     await log({
//       text: `Добавлен CSS на страницу ${css}`,
//       screenshot: false,
//       level: 'raw',
//       levelIndent: levelIndent + 1,
//     });
//   },
// };
