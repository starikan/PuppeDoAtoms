module.exports = async function atomRun() {
  const { selector } = this.selectors;
  const { attribute } = this.data;
  const element = await this.getElement(selector);

  const attributeValue = await this.page.evaluate(
    ({ element, attribute }) => {
      return element.getAttribute(attribute);
    },
    { element, attribute },
  );

  await this.log({
    text: `Get attribute: '${attribute}' from selector: '${selector}' with result: '${attributeValue}'`,
    element,
  });

  return { attributeValue };
};
