const instance = new (require('../Atom'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { selector } = this.selectors;
  const { dX = 10, dY = 10 } = this.data;

  const element = await this.getElement(this.page, selector);
  const boxElement = await element.boundingBox();
  const elementX = boxElement.x;
  const elementY = boxElement.y;

  const mouse = this.page.mouse;
  await mouse.move(elementX + dX, elementY + dY);

  this.log({
    text: `Mouse move on selector '${selector}' with gap from top rigth corner dX = ${dX}, dY = ${dY}`,
    element,
  });
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, selectors, data, log, options, helper, levelIndent, _ } = args;
//     const selector = helper.anyGet(selectors, 'selector');
//     const screenshot = _.get(options, 'screenshot', false);
//     const dX = data.dX;
//     const dY = data.dY;

//     const element = await helper.getElement(page, selector);
//     const boxElement = await element.boundingBox();
//     const elementX = await boxElement.x;
//     const elementY = await boxElement.y;

//     const mouse = page.mouse;
//     await mouse.move(elementX + dX, elementY + dY);

//     await log({
//       text: `Мышь перемещена на селектор ${selector} со смещением от верхнего левого угла dX = ${dX}, dY = ${dY}`,
//       screenshot: screenshot,
//       fullpage: false,
//       level: 'raw',
//       levelIndent: levelIndent + 1,
//     });
//   },
// };
