module.exports = {
  beforeTest: async function(args) {
    const { selectors, log, levelIndent } = args;
    await log({
      text: `Проверка наличия селектора = ${selectors.selector}`,
      screenshot: false,
      level: 'raw',
    });
  },

  runTest: async function(args) {
    const { page, selectors, log, helper, levelIndent } = args;
    let selector = helper.anyGet(selectors, 'selector');
    const element = await helper.getElement(page, selector);

    if (element) {
      await log({
        text: `Селектор найден = ${selector}`,
        screenshot: false,
        level: 'raw',
        levelIndent,
      });
      return {
        exists: true,
      };
    } else {
      await log({
        text: `Селектор НЕ найден = ${selector}`,
        screenshot: false,
        level: 'raw',
        levelIndent,
      });
      return {
        exists: false,
      };
    }
  },
};
