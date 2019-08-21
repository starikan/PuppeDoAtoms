module.exports = {
  runTest: async function(args) {
    const { env, envs, data, log, options, helper, levelIndent, _ } = args;
    let option = helper.anyGet(data, 'options');
    const screenshot = _.get(options, 'screenshot', false);

    const name = data.name;
    envs.set('current.page', name);

    await log({
      text: `Переключились на страницу ${name}`,
      screenshot: screenshot,
      fullpage: true,
      level: 'raw',
      levelIndent: levelIndent + 1,
    });
  },
};
