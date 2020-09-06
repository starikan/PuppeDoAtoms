const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function () {
  const { selector } = this.selectors;

  const { hide, visible, timeDelayBeforeWait, timeDelayAfterWait, waitingTime = 30000, noThrow = false } = this.options;

  if (timeDelayBeforeWait) {
    await this.page.waitFor(timeDelayBeforeWait);
  }

  try {
    if (this.getEngine('puppeteer')) {
      if (selector.startsWith('xpath:')) {
        const selectorClean = selector.replace(/^xpath:/, '');
        await this.page.waitForXPath(selectorClean, { visible, hidden: hide, timeout: waitingTime });
      } else {
        const selectorClean = selector.replace(/^css:/, '');
        await this.page.waitForSelector(selectorClean, { visible, hidden: hide, timeout: waitingTime });
      }
    } else if (this.getEngine('playwright')) {
      const selectorClean = selector.replace(/^css:/, '').replace(/^xpath:/, '');
      const state = visible ? 'visible' : hide ? 'hidden' : 'visible';
      await this.page.waitForSelector(selectorClean, { state, timeout: waitingTime });
    } else {
      throw new Error(`There is unknown engine: ${engine}`);
    }
  } catch (error) {
    if (!noThrow) {
      throw error;
    }
  }

  if (timeDelayAfterWait) {
    if (this.getEngine('puppeteer')) {
      await this.page.waitFor(timeDelayAfterWait);
    } else if (this.getEngine('playwright')) {
      await this.page.waitForTimeout(timeDelayAfterWait);
    } else {
      throw new Error(`There is unknown engine: ${engine}`);
    }
  }

  await this.log({ text: `Wait for selector: '${selector}'` });
};
