module.exports = async function atomRun() {
  const { selector } = this.selectors;
  const { selectorNumber = 0 } = this.data;

  const element = ((await this.getElement(selector, true)) || [])[selectorNumber];

  if (!element || (Array.isArray(element) && !element.length)) {
    await this.log({ text: `Check selector NOT exist: '${selector}'` });
    return { exists: false };
  } else {
    await this.log({ text: `Check selector exist: '${selector}'`, element });
    return { exists: true };
  }
};
