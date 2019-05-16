module.exports = {
  runTest: async function(args) {
    const { page, data, selectors, helper, levelIndent } = args;
    const selector = selectors.input;
    const text = data.text;
    const element = await helper.getElement(page, selector);
    await element.type(text);
  },

  afterTest: async function(args) {
    const { page, data, selectors, log, helper, levelIndent } = args;
    const selector = selectors.input;
    const text = data.text;
    const element = await helper.getElement(page, selector);

    await log({
      text: `Ввод текста в INPUT = ${selector}, TEXT = ${text}`,
      screenshot: true,
      fullpage: false,
      element: element,
      level: 'debug',
      levelIndent,
    });
  },
};
