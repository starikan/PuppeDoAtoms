const instance = new (require('../Atom'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { name } = this.data;
  this.envs.set('current.page', name);
  this.log({ text: `Switch on page: '${name}'` });
};

// module.exports = {
//   runTest: async function(args) {
//     const { envs, data, log, options, levelIndent, _ } = args;
//     const screenshot = _.get(options, 'screenshot', false);

//     const name = data.name;
//     envs.set('current.page', name);

//     await log({
//       text: `Переключились на страницу ${name}`,
//       screenshot: screenshot,
//       fullpage: true,
//       level: 'raw',
//       levelIndent: levelIndent + 1,
//     });
//   },
// };
