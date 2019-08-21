module.exports = {
  runTest: async function(args) {
    const { page, data, log, options, helper, levelIndent, _ } = args;
    let option = helper.anyGet(data, 'options');
    const screenshot = _.get(options, 'screenshot', false);

    const mouse = page.mouse;
    await mouse.down();

    await log({
      text: `Мышь опущена`,
      screenshot: screenshot,
      fullpage: false,
      level: 'raw',
      levelIndent: levelIndent + 1,
    });
  },
};
