module.exports = {
  runTest: async function(args) {
    const { page, selectors, log, helper, levelIndent } = args;
    const selector = helper.anyGet(selectors, 'selector');
    const element = await helper.getElement(page, selector);

    await log({
      text: `Проверка наличия селектора = ${selectors.selector}`,
      screenshot: false,
      level: 'raw',
      levelIndent: levelIndent + 1,
    });

    if (element) {
      await log({
        text: `Селектор найден = ${selector}`,
        screenshot: false,
        level: 'raw',
        levelIndent: levelIndent + 1,
      });
      return {
        exists: true,
      };
    } else {
      await log({
        text: `Селектор НЕ найден = ${selector}`,
        screenshot: false,
        level: 'raw',
        levelIndent: levelIndent + 1,
      });
      return {
        exists: false,
      };
    }
  },
};
