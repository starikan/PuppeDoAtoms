const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { width, height, deviceScaleFactor, isMobile, hasTouch, isLandscape } = await this.page.viewport();

  await this.log({ text: `Getting window attributes width='${width}', height='${height}'` });

  return { width, height, deviceScaleFactor, isMobile, hasTouch, isLandscape };
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, log, options, levelIndent, _ } = args;
//     const screenshot = _.get(options, 'screenshot', false);

//     const { width, height, deviceScaleFactor, isMobile, hasTouch, isLandscape } = await page.viewport();

//     await log({
//       text: `Получены атрибуты окна width='${width}', height='${height}'`,
//       screenshot: screenshot,
//       fullpage: false,
//       level: 'debug',
//       levelIndent: levelIndent + 1,
//     });

//     return { width, height, deviceScaleFactor, isMobile, hasTouch, isLandscape };
//   },
// };
