module.exports = {
  runTest: async function (args) {
    const { page, selectors, log, options, helper, _ , levelIndent} = args;
    let selector = helper.anyGet(selectors, 'selector');
    const screenshot = _.get(options, 'screenshot', true);
    const element = await helper.getElement(page, selector);

    await log({
      text: `Нажат селектор = ${selector}`,
      screenshot: screenshot,
      fullpage: false,
      element: element,
      level: 'debug',
      levelIndent,
    });

    await element.click(selector);
  }
};