module.exports = async function atomRun() {
  const { selector } = this.selectors;
  const { attribute, value } = this.data;
  const element = await this.getElement(selector);

  if (this.getEngine('playwright')) {
    await this.page.evaluate(
      ({ element, attribute, value }) => {
        element.setAttribute(attribute, value);
      },
      { element, attribute, value },
    );
  } else if (this.getEngine('puppeteer')) {
    await this.page.evaluate(
      (element, attribute, value) => {
        element.setAttribute(attribute, value);
      },
      element,
      attribute,
      value,
    );
  } else {
    throw new Error(`There is unknown engine ${this.getEngine()}`);
  }

  await this.log({
    text: `Set attribute: '${attribute}' from selector: '${selector}' to '${value}'`,
    element,
  });

  await element.dispose();
};
