module.exports = async function atomRun() {
  const { selector } = this.selectors;
  const element = await this.getElement(selector);

  if (!element || (Array.isArray(element) && !element.length)) {
    await this.log({ text: `Check selector NOT exist: '${selector}'` });
    return { exists: false };
  } else {
    await this.log({ text: `Check selector exist: '${selector}'`, element });
    return { exists: true };
  }
};