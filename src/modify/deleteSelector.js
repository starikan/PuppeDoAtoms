module.exports = async function atomRun() {
  const { selector } = this.selectors;
  const selectors = this._.isArray(selector) ? selector : [selector];

  for (let i = 0; i < selector.length; i++) {
    await page.evaluate(s => {
      const elements = document.querySelectorAll(s);
      for (let j = 0; j < elements.length; j++) {
        elements[j].parentNode.removeChild(elements[j]);
      }
    }, selectors[i]);
  }

  await this.log({ text: `Selectors deleted: '${JSON.stringify(selectors)}'` });
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, selectors, log, levelIndent, _ } = args;

//     let _selectors = _.get(selectors, 'selector');
//     _selectors = _.isArray(_selectors) ? _selectors : [_selectors];

//     for (let i = 0; i < _selectors.length; i++) {
//       const selector = _selectors[i];
//       await page.evaluate(sel => {
//         var elements = document.querySelectorAll(sel);
//         for (var i = 0; i < elements.length; i++) {
//           elements[i].parentNode.removeChild(elements[i]);
//         }
//       }, selector);
//     }

//     await log({
//       text: `Селектор удален со страницы: ${JSON.stringify(_selectors)}`,
//       screenshot: false,
//       level: 'raw',
//       levelIndent: levelIndent + 1,
//     });
//   },
// };
