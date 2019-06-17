module.exports = {
  runTest: async function(args) {
    const { page, selectors, data, log, options, helper, levelIndent, _ } = args;
    let selector = helper.anyGet(selectors, 'selector');
    let option = helper.anyGet(data, 'options');
    const screenshot = _.get(options, 'screenshot', false);
    const element = await helper.getElement(page, selector);
    let X = data.X;
    let Y = data.Y;

    const mouse = page.mouse;
    await mouse.click(X, Y);

    await log({
      text: `Мышь кликнула по странице в координатах X = ${X}, Y = ${Y}`,
      screenshot: screenshot,
      fullpage: false,
      element: element,
      level: 'raw',
      levelIndent,
    });
  },
};
