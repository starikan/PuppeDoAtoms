module.exports = {

  beforeTest: async function (args) {
    const { selectors, log } = args;
    await log({
      text: `Подсчет количества селекторов = ${selectors.selector}`,
      screenshot: false,
      level: 'raw'
    })
  },

  runTest: async function (args) {
    const { page, selectors, log, helper } = args;
    let selector = helper.anyGet(selectors, 'selector');
    const elements = await helper.getElement(page, selector, allElements = true);

    await log({
      text: `Селекторов ${selectors.selector} найдено = ${elements.length}`,
      screenshot: false,
      level: 'raw'
    });

    return {
      count: elements.length
    }
  }
};