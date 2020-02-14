const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { selector } = this.selectors;
  const { count = 1, delay = 1, button = 'left' } = this.options;
  const element = await this.getElement(this.page, selector);

  await this.log({ text: `Click selector: '${selector}'`, element });

  for (let i = 0; i < count; i++) {
    try {
      await element.click({ delay, button });
    } catch (error) {
      await this.log({ text: `Can't click selector: '${selector}'`, element, screenshot: true, extendInfo: true });
      throw error;
    }
  }
};
