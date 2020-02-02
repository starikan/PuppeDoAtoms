const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { waitUntil = 'load' } = this.options;
  await this.page.waitForNavigation({ waitUntil });
  await this.log({ text: 'Waiting page load' });
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, options, log, levelIndent, _ } = args;

//     await page.waitForNavigation({ waitUntil: _.get(options, 'waitUntil', 'load') });
//     await log({
//       text: 'waitLoadPage',
//       screenshot: false,
//       fullpage: false,
//       level: 'debug',
//       levelIndent: levelIndent + 1,
//     });
//   },
// };
