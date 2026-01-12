module.exports = async function atomRun() {
  const { selector } = this.selectors;
  const element = await this.getElement(selector);

  await element.hover(selector);

  await this.log({ text: `Hover selector: '${selector}'`, element });
};
