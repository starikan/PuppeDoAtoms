const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { input } = this.selectors;
  const { text } = this.data;
  const element = await this.getElement(this.page, input);
  await element.type(String(text));

  this.log({ text: `Type in selector: '${input}', text: '${text}'`, element });
};
