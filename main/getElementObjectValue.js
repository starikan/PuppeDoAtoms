const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { selector } = this.selectors;
  const { key } = this.data;
  const element = await this.getElement(this.page, selector);

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
