module.exports = {
  runTest: async function (args) {
    const { page, data, log, _ } = args;

    const css = _.get(data, 'css');

    await page.addStyleTag({ content: css });
    log({
      text: `Добавлен CSS на страницу ${css}`,
      screenshot: false,
      level: 'raw',
    });
  }
};