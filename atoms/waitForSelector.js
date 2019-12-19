const instance = new (require('../Atom'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  let { selector } = this.selectors;

  const { hide, visible, timeDellay } = this.options;

  if (timeDellay) {
    await this.page.waitFor(timeDellay);
  }

  if (selector.startsWith('xpath:')) {
    selector = this._.trimStart(selector, 'xpath:');
    await this.page.waitForXPath(selector, { visible, hidden: hide });
  } else {
    selector = this._.trimStart(selector, 'css:');
    await this.page.waitForSelector(selector, { visible, hidden: hide });
  }

  this.log({ text: `Wait for selector: '${selector}'` });
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, selectors, options, log, helper, levelIndent, _ } = args;
//     let selector = helper.anyGet(selectors, 'selector');

//     const hide = helper.anyGet(options, 'hidden');
//     const visible = helper.anyGet(options, 'visible');

//     const timeDellay = helper.anyGet(options, 'timeDellay');
//     if (timeDellay) {
//       await page.waitFor(timeDellay);
//     }

//     if (selector.startsWith('xpath:')) {
//       selector = _.trimStart(selector, 'xpath:');
//       await page.waitForXPath(selector, {
//         visible: visible,
//         hidden: hide,
//       });
//     } else {
//       selector = _.trimStart(selector, 'css:');
//       await page.waitForSelector(selector, {
//         visible: visible,
//         hidden: hide,
//       });
//     }

//     await log({
//       text: `waitForSelector ${selector}`,
//       screenshot: false,
//       fullpage: false,
//       level: 'debug',
//       levelIndent: levelIndent + 1,
//     });
//   },
// };
