const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  let { selector } = this.selectors;

  const { hide, visible, timeDellay } = this.options;

  if (timeDellay) {
    await this.page.waitFor(timeDellay);
  }

  if (selector.startsWith('xpath:')) {
    const selectorClean = selector.replace(/^xpath:/, '');
    await this.page.waitForXPath(selectorClean, { visible, hidden: hide });
  } else {
    const selectorClean = selector.replace(/^css:/, '');
    await this.page.waitForSelector(selectorClean, { visible, hidden: hide });
  }

  await this.log({ text: `Wait for selector: '${selector}'` });
};
