module.exports = {
  runTest: async function (args) {
    const { page, selectors, data, log, options, helper, _ } = args;
    let selector = helper.anyGet(selectors, 'selector');
    let screenshot = _.get(options, 'screenshot', false);
    let attr = helper.anyGet(data, 'attribute');
    const element = await helper.getElement(page, selector);

    let text = await page.evaluate( (element) => {
      return element.innerText;
    }, element);

    await log({
      text: `Получен атрибут текст '${text}' на селекторе = ${selector}`,
      screenshot: screenshot,
      fullpage: false,
      element: element,
      level: 'debug'
    });

    return {
      text: text
    }
  }
};