const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function () {
  const { selector } = this.selectors;
  const { text } = this.data;
  const { noClearInput } = this.options;

  const element = await this.getElement(selector);

  const logEntry = `Type in selector: '${selector}', text: '${text}'`;

  if (!element) {
    await this.log({ text: logEntry, element, level: 'error' });
    throw { message: logEntry };
  }

  if (!noClearInput) {
    await element.focus();
    await this.page.keyboard.down('Control');
    await this.page.keyboard.press('A');
    await this.page.keyboard.up('Control');
    await this.page.keyboard.press('Backspace');
  }

  await element.type(String(text));
  await this.log({ text: logEntry, element });
};
