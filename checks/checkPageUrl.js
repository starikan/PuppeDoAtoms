const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { url } = this.data;
  const allPages = await this.browser.pages();
  const exist = allPages.map(page => page.url().includes(url)).some(v => v);

  if (exist) {
    await this.log({ text: `URL found: '${url}'` });
  } else {
    await this.log({ text: `URL not found: '${url}'`, level: 'error' });
  }
  return { exists };
};

// module.exports = {
//   runTest: async function(args) {
//     const { browser, data, log, levelIndent } = args;
//     // 2018-08-14 S.Starodubov сделать нормальный скриншот страницы которая открывается

//     const allPages = await browser.pages();
//     const url = data.url;
//     let isUrlExist = false;

//     allPages.forEach(page => {
//       if (page.url().includes(url)) {
//         isUrlExist = true;
//       }
//     });

//     // 2019-04-29 S.Starodubov отрефкторить этот кусок
//     if (isUrlExist) {
//       await log({
//         text: `Страница найдена URL = ${url}`,
//         screenshot: false,
//         level: 'raw',
//         levelIndent: levelIndent + 1,
//       });
//     } else {
//       await log({
//         text: `Страница НЕ найдена URL = ${url}`,
//         screenshot: false,
//         level: 'raw',
//         levelIndent: levelIndent + 1,
//       });
//     }
//   },
// };
