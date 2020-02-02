const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { selector } = this.selectors;
  const element = await this.getElement(this.page, selector);

  const boxElement = await element.boundingBox();
  const { x, y, width, height } = boxElement;

  await this.log({ text: `Selector '${selector}' coords: X = ${x}, Y = ${y}, WIDTH = ${width}, HEIGHT = ${height}` });

  return { x, y, width, height };
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, selectors, log, options, helper, levelIndent, _ } = args;
//     const selector = helper.anyGet(selectors, 'selector');
//     const screenshot = _.get(options, 'screenshot', false);

//     const element = await helper.getElement(page, selector);
//     const boxElement = await element.boundingBox();
//     const x = boxElement.x;
//     const y = boxElement.y;
//     const width = boxElement.width;
//     const height = boxElement.height;

//     await log({
//       text: `Получены координаты селектора ${selector} X = ${x}, Y = ${y}, WIDTH = ${width}, HEIGHT = ${height}`,
//       screenshot: screenshot,
//       fullpage: false,
//       level: 'raw',
//       levelIndent: levelIndent + 1,
//     });

//     return {
//       x,
//       y,
//       width,
//       height,
//     };
//   },
// };
