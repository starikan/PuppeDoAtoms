const instance = new (require('../Atom'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { time } = this.data;
  this.log({ text: `Waiting ${time} ms.` });
  await this.page.waitFor(time);
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, data, log, levelIndent } = args;
//     const time = data.time;

//     await page.waitFor(time);

//     await log({
//       text: `waitTime ${time}ms`,
//       screenshot: false,
//       fullpage: false,
//       level: 'debug',
//       levelIndent: levelIndent + 1,
//     });
//   },
// };
