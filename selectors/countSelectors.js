module.exports = async function atomRun() {
  const { selector } = this.selectors;
  const { timeDelay } = this.options;

  let elements = [];

  if (timeDelay) {
    await this.page.waitFor(timeDelay);
  }

  await this.log({ text: `Counting selectors: '${selector}'` });
  try {
    elements = await this.getElement(selector, true);
  } catch (error) {}
  await this.log({ text: `Selectors '${selector}' found '${elements.length}'` });

  return { count: elements.length };
};
