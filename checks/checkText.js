const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { text } = this.data;
  const { selector } = this.selectors;

  const element = await this.getElement(page, selector);
  const { innerText } = element;
  const exists = innerText === text;

  if (exists) {
    await this.log({ text: `Text '${text}' found on element '${selector}'`, element });
  } else {
    await this.log({ text: `Text '${text}' not found on element '${selector}'`, screenshot: true, element, level: 'error' });
  }

  return { exists };
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, selectors, data, log, helper, levelIndent } = args;

//     const text = data.text;
//     const selector = selectors.selector;

//     const element = await helper.getElement(page, selector);
//     const elementText = element.innerText;

//     if (elementText === text) {
//       await log({
//         text: `Текст '${text}' найден в элементе '${selector}'`,
//         screenshot: true,
//         element: element,
//         level: 'raw',
//         levelIndent: levelIndent + 1,
//       });
//     } else {
//       await log({
//         text: `Текст '${text}' НЕ найден в элементе '${selector}'`,
//         screenshot: true,
//         element: element,
//         level: 'raw',
//         levelIndent: levelIndent + 1,
//       });
//     }

//     return {
//       exists: elementText === text,
//     };
//   },
// };
