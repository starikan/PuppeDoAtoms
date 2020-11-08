module.exports = async function atomRun() {
  const { selector } = this.selectors;

  const { hide, visible, timeDelayBeforeWait, timeDelayAfterWait, waitingTime = 30000, noThrow = false } = this.options;

  if (timeDelayBeforeWait) {
    await this.page.waitForTimeout(timeDelayBeforeWait);
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
      throw new Error(`There is unknown engine ${this.getEngine()}`);
    }
  } catch (error) {
    if (!noThrow) {
      throw error;
    }
  }

  if (timeDelayAfterWait) {
    await this.page.waitForTimeout(timeDelayAfterWait);
  }

  await this.log({ text: `Wait for selector: '${selector}'` });
};
