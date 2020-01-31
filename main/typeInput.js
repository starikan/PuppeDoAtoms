const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { input } = this.selectors;
  const { text } = this.data;
  const element = await this.getElement(this.page, input);

  const logEntry = `Type in selector: '${input}', text: '${text}'`;

  if (!element) {
    this.log({ text: logEntry, element, level: 'error' });
    throw { message: logEntry };
  }

  await element.type(String(text));
  this.log({ text: logEntry, element });
};
