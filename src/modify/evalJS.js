module.exports = async function atomRun() {
  const { js } = this.data;

  const data = await this.page.evaluate(js);
  await this.log({ text: `Evaluate JS: '${js}' with result '${data}'` });

  return { data };
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, data, log, levelIndent, _ } = args;

//     const js = _.get(data, 'js');

//     const dataEval = await page.evaluate(js);
//     await log({
//       text: `Выполнение кода JS: ${js}`,
//       screenshot: false,
//       level: 'raw',
//       levelIndent: levelIndent + 1,
//     });

//     return { data: dataEval };
//   },
// };
