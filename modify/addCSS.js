const instance = new (require('../Atom'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { css } = this.data;
  await this.page.addStyleTag({ content: css });
  this.log({ text: `CSS inject on the page: ${css}` });
};
