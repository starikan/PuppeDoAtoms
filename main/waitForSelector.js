const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function () {
  let { selector } = this.selectors;

  const { hide, visible, timeDelayBeforeWait, timeDelayAfterWait, waitingTime = 30000, noThrow = false } = this.options;

  if (timeDelayBeforeWait) {
    await this.page.waitFor(timeDelayBeforeWait);
  }

  try {
    if (selector.startsWith('xpath:')) {
      const selectorClean = selector.replace(/^xpath:/, '');
      await this.page.waitForXPath(selectorClean, { visible, hidden: hide, timeout: waitingTime });
    } else {
      const selectorClean = selector.replace(/^css:/, '');
      await this.page.waitForSelector(selectorClean, { visible, hidden: hide, timeout: waitingTime });
    }
  } catch (error) {
    if (!noThrow) {
      throw error;
    }
  }

  if (timeDelayAfterWait) {
    await this.page.waitFor(timeDelayAfterWait);
  }

  await this.log({ text: `Wait for selector: '${selector}'` });
};
