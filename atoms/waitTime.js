module.exports = {
  runTest: async function (args) {
    const { page, data, log } = args;
    const time = data.time;

    await page.waitFor( time );

    await log({
      text: `waitTime ${time}ms`,
      screenshot: false,
      fullpage: false,
      level: 'debug',
    });
  }
};