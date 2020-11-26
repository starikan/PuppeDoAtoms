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

  if (this.getEngine('playwright')) {
    await this.page.evaluate(
      ({ element, text, noClearInput }) => {
        if (noClearInput) {
          text = element.value + String(text);
        }
        element.value = String(text);
        element.dispatchEvent(new Event('change'));
      },
      { element, text, noClearInput },
    );
  } else if (this.getEngine('puppeteer')) {
    await this.page.evaluate(
      (element, text, noClearInput) => {
        if (noClearInput) {
          text = element.value + String(text);
        }
        element.value = String(text);
        element.dispatchEvent(new Event('change'));
      },
      element,
      text,
      noClearInput,
    );
  } else {
    throw new Error(`There is unknown engine ${this.getEngine()}`);
  }

  await this.log({ text: logEntry, element });

  await element.dispose();
};
