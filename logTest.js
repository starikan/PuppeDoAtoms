module.exports = {
  runTest: async function(args) {
    const CircularJSON = require('circular-json');
    const {
      envName,
      envPageName,
      env,
      browser,
      page,
      data,
      selectors,
      options,
      envsId,
      envs,
      log,
      helper,
      levelIndent,
      _,
    } = args;

    let selector = _.get(data, 'selector');
    let text = _.get(data, 'text', '');
    let screenshot = _.get(data, 'screenshot', false);
    let fullpage = _.get(data, 'fullpage', false);
    let level = _.get(data, 'level', 'raw');
    let logVars = _.get(data, 'logVars', false);
    let logData = _.get(data, 'logData', false);
    let logSelectors = _.get(data, 'logSelectors', false);
    let logBrowser = _.get(data, 'logBrowser', false);
    let logPage = _.get(data, 'logPage', false);
    let logOptions = _.get(data, 'logOptions', false);
    let logEnv = _.get(data, 'logEnv', false);
    let logEnvs = _.get(data, 'logEnvs', false);
    let debug = _.get(data, 'debug', false);

    let element = false;
    if (selector) {
      element = await helper.getElement(page, selector);
    }

    if (logVars) {
      let vars = {
        envName,
        envPageName,
        envsId,
      };
      await log({
        text: `
============================ VARS
${JSON.stringify(vars, null, '  ')}
============================ VARS
        `,
        screenshot: false,
        fullpage: false,
        level: 'raw',
        levelIndent,
      });
    }

    if (logData) {
      await log({
        text: `
============================ DATA
${JSON.stringify(data, null, '  ')}
============================ DATA
        `,
        screenshot: false,
        fullpage: false,
        level: 'raw',
        levelIndent,
      });
    }

    if (logSelectors) {
      await log({
        text: `
============================ SELECTOR
${JSON.stringify(selectors, null, '  ')}
============================ SELECTOR
        `,
        screenshot: false,
        fullpage: false,
        level: 'raw',
        levelIndent,
      });
    }

    if (logBrowser) {
      await log({
        text: `
============================ BROWSER
${CircularJSON.stringify(browser, null, '  ')}
============================ BROWSER
        `,
        screenshot: false,
        fullpage: false,
        level: 'raw',
        levelIndent,
      });
    }

    if (logPage) {
      await log({
        text: `
============================ PAGE
${CircularJSON.stringify(page, null, '  ')}
============================ PAGE
        `,
        screenshot: false,
        fullpage: false,
        level: 'raw',
        levelIndent,
      });
    }

    if (logOptions) {
      await log({
        text: `
============================ OPTIONS
${CircularJSON.stringify(options, null, '  ')}
============================ OPTIONS
        `,
        screenshot: false,
        fullpage: false,
        level: 'raw',
        levelIndent,
      });
    }

    if (logEnv) {
      await log({
        text: `
============================ ENV
${CircularJSON.stringify(env, null, '  ')}
============================ ENV
        `,
        screenshot: false,
        fullpage: false,
        level: 'raw',
        levelIndent,
      });
    }

    if (logEnvs) {
      await log({
        text: `
============================ ENVS
${CircularJSON.stringify(envs, null, '  ')}
============================ ENVS
        `,
        screenshot: false,
        fullpage: false,
        level: 'raw',
        levelIndent,
      });
    }

    if (debug) {
      if (process.env.PPD_DEBUG_MODE) debugger;
    }

    await log({
      text: text,
      screenshot: screenshot,
      fullpage: fullpage,
      element: element,
      level: level,
      levelIndent,
    });
  },
};
