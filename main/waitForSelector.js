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
    selector = this._.trimStart(selector, 'xpath:');
    await this.page.waitForXPath(selector, { visible, hidden: hide });
  } else {
    selector = this._.trimStart(selector, 'css:');
    await this.page.waitForSelector(selector, { visible, hidden: hide });
  }

  this.log({ text: `Wait for selector: '${selector}'` });
};
