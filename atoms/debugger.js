module.exports = {
  runTest: async function(args) {
    const { page, log, options, levelIndent } = args;
    const { browser = true, server } = options;
    await log({
      text: 'DEBUGER',
      screenshot: false,
      levelIndent: levelIndent + 1,
    });
    if (browser) {
      await page.evaluate(() => {
        debugger;
      });
    }
    if (server) {
      debugger;
    }
  },
};
