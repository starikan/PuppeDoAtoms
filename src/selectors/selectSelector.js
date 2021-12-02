module.exports = async function atomRun() {
  const { selector } = this.selectors;
  const { option } = this.data;
  const element = await this.getElement(selector);

  await element.select(option);

  await this.log({ text: `Selector select: '${selector}'`, element });
};
