const instance = new (require('../Atom'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const mouse = this.page.mouse;
  await mouse.up();

  this.log({ text: 'Mouse up' });
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, log, options, levelIndent, _ } = args;
//     const screenshot = _.get(options, 'screenshot', false);

//     const mouse = page.mouse;
//     await mouse.up();

//     await log({
//       text: 'Кнопка мыши поднята',
//       screenshot: screenshot,
//       fullpage: false,
//       level: 'raw',
//       levelIndent: levelIndent + 1,
//     });
//   },
// };
