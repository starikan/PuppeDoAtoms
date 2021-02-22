module.exports = async function atomRun() {
  const { selector } = this.selectors;
  const { selectorNumber, getAll } = this.data;

  const extractElementText = async (element) => {
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

    return text;
  };

  const elements = await this.getElement(selector, true);

  if (!elements || !elements.length) {
    throw { message: `Can't find any selector: '${selector}'` };
  }

  if (![null, undefined].includes(selectorNumber)) {
    const element = elements[selectorNumber || 0];
    if (element) {
      const text = await extractElementText(element);
      await Promise.all(elements.map(async (elem) => await elem.dispose()));
      return { text, array: [text] };
    } else {
      throw { message: `Can't find selector: '${selector}' by index ${selectorNumber || 0}` };
    }
  }

  if (getAll) {
    const array = [];
    for (let element of elements) {
      array.push(await extractElementText(element));
    }
    await Promise.all(elements.map(async (elem) => await elem.dispose()));
    return { text: null, array };
  }

  throw { message: 'Use "selectorNumber" or "getAll" flags in data of getText Atom' };
};
