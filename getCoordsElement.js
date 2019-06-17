module.exports = {
  runTest: async function(args) {
    const { page, selectors, data, log, options, helper, levelIndent, _ } = args;
    const selector = helper.anyGet(selectors, 'selector');
    const dataOptions = helper.anyGet(data, 'options');
    const screenshot = _.get(options, 'screenshot', false);

    const element = await helper.getElement(page, selector);
    const boxElement = await element.boundingBox();
    const x = boxElement.x;
    const y = boxElement.y;
    const width = boxElement.width;
    const height = boxElement.height;

    await log({
      text: `Получены координаты селектора ${selector} X = ${x}, Y = ${y}, WIDTH = ${width}, HEIGHT = ${height}`,
      screenshot: screenshot,
      fullpage: false,
      level: 'raw',
      levelIndent,
    });

    return {
      x,
      y,
      width,
      height,
    };
  },
};
