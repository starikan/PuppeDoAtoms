module.exports = async function atomRun() {
  const { selector } = this.selectors;
  const { attribute } = this.data;
  const element = await this.getElement(selector);

  let attributeValue;

  if (this.getEngine('playwright')) {
    attributeValue = await this.page.evaluate(
      ({ element, attribute }) => {
        return element.getAttribute(attribute);
      },
      { element, attribute },
    );
  } else if (this.getEngine('puppeteer')) {
    attributeValue = await this.page.evaluate(
      (element, attribute) => {
        return element.getAttribute(attribute);
      },
      element,
      attribute,
    );
  } else {
    throw new Error(`There is unknown engine ${this.getEngine()}`);
  }

  await this.log({
    text: `Get attribute: '${attribute}' from selector: '${selector}' with result: '${attributeValue}'`,
    element,
  });

  return { attributeValue };
};
