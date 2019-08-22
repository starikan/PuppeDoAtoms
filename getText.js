module.exports = {
  runTest: async function(args) {
    let selector, screenshot, element, attr, text, value, selectorSelect, elementSelect;
    try {
      const { page, selectors, data, log, options, helper, levelIndent, _ } = args;
      selector = helper.anyGet(selectors, 'selector');
      screenshot = _.get(options, 'screenshot', false);
      attr = helper.anyGet(data, 'attribute');
      element = await helper.getElement(page, selector);

      if (element) {

        text = await page.evaluate(element => {
          return element.innerText;
        }, element);
        value = await page.evaluate(element => {
          return element.value;
        }, element);

        // Select fetch data
        if (value && !text) {
          selectorSelect = selector + ` > option[value = "${value}"]`
          elementSelect = await helper.getElement(page, selectorSelect);
          text = await page.evaluate(element => {
            return element.label;
          }, elementSelect);
        }
      } else {
        throw { message: `Can't find selector ${selector}` };
      }

      await log({
        text: `Get text: '${text}' from selector: '${selector}'`,
        screenshot: screenshot,
        fullpage: false,
        element: element,
        level: 'debug',
        levelIndent: levelIndent + 1,
      });

      return { text, value };
    } catch (error) {
      error.testType = 'atom';
      error.testArgs = args;
      error.testVars = { selector, screenshot, element, attr, text, value, selectorSelect, elementSelect };
      throw error;
    }
  },
};
