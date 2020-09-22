module.exports = async function atomRun() {
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
