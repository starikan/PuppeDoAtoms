module.exports = {
  runTest: async function(args) {
    const { page, selectors, log, levelIndent, _ } = args;

    const selector = _.get(selectors, 'selector');

    await page.evaluate(sel => {
      var elements = document.querySelectorAll(sel);
      for (var i = 0; i < elements.length; i++) {
        elements[i].parentNode.removeChild(elements[i]);
      }
    }, selector);

    await log({
      text: `Селектор удален со страницы: ${selector}`,
      screenshot: false,
      level: 'raw',
      levelIndent,
    });
  },
};
