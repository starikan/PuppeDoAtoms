module.exports = async function atomRun() {
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
    await element.evaluate((element) => {
      element.value = '';
    }, element);
  }

  await element.type(String(text));
  await this.log({ text: logEntry, element });

  await element.dispose();
};
