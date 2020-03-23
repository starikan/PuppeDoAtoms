const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { selector } = this.selectors;
  const { option } = this.data;
  const element = await this.getElement(this.page, selector);

  await this.page.select(selector, option);

  await this.log({ text: `Selector select: '${selector}'`, element });
};
