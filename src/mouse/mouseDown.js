module.exports = async function atomRun() {
  const mouse = this.page.mouse;
  await mouse.down();

  await this.log({ text: 'Mouse down' });
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, log, options, levelIndent, _ } = args;
//     const screenshot = _.get(options, 'screenshot', false);

//     const mouse = page.mouse;
//     await mouse.down();

//     await log({
//       text: 'Кнопка мыши опущена',
//       screenshot: screenshot,
//       fullpage: false,
//       level: 'raw',
//       levelIndent: levelIndent + 1,
//     });
//   },
// };
