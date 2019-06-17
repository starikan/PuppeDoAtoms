module.exports = {
  runTest: async function(args) {
    const { page, selectors, data, log, options, helper, levelIndent, _ } = args;
    let selector = helper.anyGet(selectors, 'selector');
    let option = helper.anyGet(data, 'options');
    const screenshot = _.get(options, 'screenshot', false);
    let dX = data.dX;
    let dY = data.dY;

    const element = await helper.getElement(page, selector);
    let boxElement = await element.boundingBox();
    const elementX = await boxElement.x;
    const elementY = await boxElement.y;

    const mouse = page.mouse;
    await mouse.move(elementX + dX, elementY + dY);

    await log({
      text: `Мышь перемещена на селектор ${selector} со смещением от верхнего левого угла dX = ${dX}, dY = ${dY}`,
      screenshot: screenshot,
      fullpage: false,
      level: 'raw',
      levelIndent,
    });
  },
};
