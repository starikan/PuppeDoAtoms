module.exports = {
  runTest: async function (args) {
    const { page, log } = args;
    await log({
      text: "DEBUG PAGE",
      screenshot: false
    })
    await page.evaluate(() => { debugger });
  }
};