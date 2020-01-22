const instance = new (require('../Atom'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { browser = true, server } = this.options;

  this.log({ text: 'DEBUGGER' });

  if (browser) {
    await this.page.evaluate(() => {
      debugger;
    });
  }
  if (server) {
    debugger;
  }
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, log, options, levelIndent } = args;
//     const { browser = true, server } = options;
//     await log({
//       text: 'DEBUGER',
//       screenshot: false,
//       levelIndent: levelIndent + 1,
//     });
//     if (browser) {
//       await page.evaluate(() => {
//         debugger;
//       });
//     }
//     if (server) {
//       debugger;
//     }
//   },
// };
