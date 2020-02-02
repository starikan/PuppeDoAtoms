const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { js, jsFile } = this.data;

  if (jsFile) {
    await this.page.addScriptTag({ path: jsFile });
    await this.log({ text: `JS inject on page: ${jsFile}` });
  } else if (js) {
    await this.page.addScriptTag({ content: js });
    await this.log({ text: `JS inject on page ${js}` });
  } else {
    await this.log({ text: `Can't add JS on the page. No any data.`, level: 'error' });
  }
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, data, log, levelIndent, _ } = args;

//     const js = _.get(data, 'js');
//     const jsFile = _.get(data, 'jsFile');

//     if (jsFile) {
//       await page.addScriptTag({ path: jsFile });
//       await log({
//         text: `Добавлен JS на страницу ${jsFile}`,
//         screenshot: false,
//         level: 'raw',
//         levelIndent: levelIndent + 1,
//       });
//     } else if (js) {
//       await page.addScriptTag({ content: js });
//       await log({
//         text: `Добавлен JS на страницу ${js}`,
//         screenshot: false,
//         level: 'raw',
//         levelIndent: levelIndent + 1,
//       });
//     }
//   },
// };
