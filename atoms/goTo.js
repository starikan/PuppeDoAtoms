const instance = new (require('../Atom'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { url } = this.data;
  await this.page.goto(url);
  this.log({ text: `Go to: ${url}` });
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, data, log, levelIndent } = args;
//     await page.goto(data.url);
//     await log({
//       text: `Go to: ${data.url}`,
//       level: 'info',
//       screenshot: false,
//       fullpage: false,
//       levelIndent: levelIndent + 1,
//     });
//   },
// };
