const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { selector } = this.selectors;
  const { count = 1, delay = 1, button = 'left', logAfter = false } = this.options;
  const element = await this.getElement(this.page, selector);

  for (let i = 0; i < count; i++) {
    try {
      if (!logAfter) {
        await this.log({ text: `Click selector: '${selector}'`, element });
      }
      await element.click({ delay, button });
      if (logAfter) {
        await this.log({ text: `Click selector: '${selector}'`, element });
      }
    } catch (error) {
      await this.log({
        text: `Can't click selector: '${selector}'`,
        element,
        screenshot: true,
        extendInfo: true,
        level: 'error',
      });
      throw error;
    }
  }
};
