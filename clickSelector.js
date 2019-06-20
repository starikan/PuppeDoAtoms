module.exports = {
  runTest: async function (args) {
    const { page, selectors, log, options, helper, _ , levelIndent} = args;
    let selector = helper.anyGet(selectors, 'selector');
    const screenshot = _.get(options, 'screenshot', false);
    const element = await helper.getElement(page, selector);
    const count = _.get(options, 'count', 1);

    await log({
      text: `Нажат селектор = ${selector}`,
      screenshot: screenshot,
      fullpage: false,
      element: element,
      level: 'debug',
      levelIndent,
    });

    for (let i = 0; i < count; i++) {
      await element.click(selector);
    }
  }
};