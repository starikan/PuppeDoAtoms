module.exports = async function atomRun() {
  const { selector } = this.selectors;
  const { key } = this.data;
  const element = await this.getElement(selector);

  try {
    const value = await this.page.evaluate(
      (element, attribute) => {
        return element[attribute];
      },
      element,
      key,
    );
    return { value };
  } catch (error) {
    await this.log({
      text: `Can't get '${key}' from selector: '${selector}'`,
      element,
      screenshot: true,
      extendInfo: true,
      level: 'error',
    });
    throw error;
  }
};
