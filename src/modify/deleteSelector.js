module.exports = async function atomRun() {
  const { selector } = this.selectors;
  const selectors = Array.isArray(selector) ? selector : [selector];

  for (let i = 0; i < selector.length; i++) {
    await this.page.evaluate((s) => {
      const elements = document.querySelectorAll(s);
      for (let j = 0; j < elements.length; j++) {
        elements[j].parentNode.removeChild(elements[j]);
      }
    }, selectors[i]);
  }

  await this.log({ text: `Selectors deleted: '${JSON.stringify(selectors)}'` });
};
