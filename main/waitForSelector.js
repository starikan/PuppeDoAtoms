const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  let { selector } = this.selectors;

  const { hide, visible, timeDelay, timeDelayBeforeWait, timeDelayAfterWait } = this.options;

  // TODO: Backward compatibility, remove in major version > 3
  if (timeDelay) {
    await this.page.waitFor(timeDelay);
  }

  if (timeDelayBeforeWait) {
    await this.page.waitFor(timeDelayBeforeWait);
  }

  if (selector.startsWith('xpath:')) {
    const selectorClean = selector.replace(/^xpath:/, '');
    await this.page.waitForXPath(selectorClean, { visible, hidden: hide });
  } else {
    const selectorClean = selector.replace(/^css:/, '');
    await this.page.waitForSelector(selectorClean, { visible, hidden: hide });
  }

  if (timeDelayAfterWait) {
    await this.page.waitFor(timeDelayAfterWait);
  }

  await this.log({ text: `Wait for selector: '${selector}'` });
};
