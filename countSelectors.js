module.exports = {
  beforeTest: async function(args) {
    const { selectors, log, levelIndent } = args;
    await log({
      text: `Подсчет количества селекторов = ${selectors.selector}`,
      screenshot: false,
      level: 'raw',
      levelIndent: levelIndent + 1,
    });
  },

  runTest: async function(args) {
    const { page, selectors, log, helper, levelIndent } = args;
    let selector = helper.anyGet(selectors, 'selector');
    const elements = await helper.getElement(page, selector, (allElements = true));

    await log({
      text: `Селекторов ${selectors.selector} найдено = ${elements.length}`,
      screenshot: false,
      level: 'raw',
      levelIndent: levelIndent + 1,
    });

    return {
      count: elements.length,
    };
  },
};
