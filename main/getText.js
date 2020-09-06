const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function () {
  const { selector } = this.selectors;
  const { selectorNumber } = this.data;

  const elements = await this.getElement(selector, true);
  const element = elements[selectorNumber || 0];

  if (element) {
    const { tagName, innerText, value } = await this.page.evaluate((element) => {
      return { tagName: element.tagName, innerText: element.innerText, value: element.value };
    }, element);

    let text = innerText;

    // Select fetch data
    if (value && !text && tagName === 'SELECT') {
      const selectorSelect = `option[value = "${value}"]`;
      const elementSelect = await this.getElement(selectorSelect, false, element);
      text = await this.page.evaluate((element) => element.label, elementSelect);
    }

    // Input
    if (value && !text && tagName === 'INPUT') {
      text = value;
    }

    await this.log({ text: `Get text: '${text}' from selector: '${selector}'`, element });

    return { text };
  } else {
    throw { message: `Can't find selector: '${selector}' by index ${selectorNumber || 0}` };
  }
};
