module.exports = {
  runTest: async function (args) {
    const { page, options, log, _ } = args;

    await page.waitForNavigation({ waitUntil: _.get(options, 'waitUntil', 'load') });
    await log({
      text: `waitLoadPage`,
      screenshot: false,
      fullpage: false,
      level: 'debug',
    });
  }
};