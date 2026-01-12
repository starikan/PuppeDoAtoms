module.exports = async function atomRun() {
  const { text } = this.data;
  const { selector } = this.selectors;

  const element = await this.getElement(selector);
  const { innerText } = element;
  const exists = innerText === text;

  if (exists) {
    await this.log({ text: `Text '${text}' found on element '${selector}'`, element });
  } else {
    await this.log({
      text: `Text '${text}' not found on element '${selector}'`,
      screenshot: true,
      element,
      level: 'error',
    });
  }

  return { exists };
};
