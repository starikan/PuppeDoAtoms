module.exports = {
  runTest: async function(args) {
    const { page, selectors, data, options, log, helper, levelIndent, _ } = args;
    let selector = helper.anyGet(selectors, 'selector');
    let timeDellay = helper.anyGet(data, 'timeDellay');

    let hide = helper.anyGet(options, 'hidden');
    let visible = helper.anyGet(options, 'visible');

    if (timeDellay) {
      await page.waitFor(timeDellay);
    }

    if (selector.startsWith('xpath:')) {
      selector = _.trimStart(selector, 'xpath:');
      await page.waitForXPath(selector, {
        visible: visible,
        hidden: hide,
      });
    } else {
      selector = _.trimStart(selector, 'css:');
      await page.waitForSelector(selector, {
        visible: visible,
        hidden: hide,
      });
    }

    await log({
      text: `waitForSelector ${selector}`,
      screenshot: false,
      fullpage: false,
      level: 'debug',
      levelIndent: levelIndent + 1,
    });
  },
};
