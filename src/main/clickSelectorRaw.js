module.exports = async function atomRun() {
  const { selector } = this.selectors;
  const { selectorNumber = 0 } = this.data;
  const {
    count = 1,
    timeDelayBeforeClick = 1,
    button = 'left',
    logAfter = false,
    timeDelayAfterClick = 0,
  } = this.options;
  const element = ((await this.getElement(selector, true)) || [])[selectorNumber];

  for (let i = 0; i < count; i++) {
    try {
      if (!logAfter) {
        await this.log({ text: `Click selector: '${selector}'`, element });
      }
      await element.click({ delay: timeDelayBeforeClick, button });
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

    if (timeDelayAfterClick) {
      await this.page.waitForTimeout(timeDelayAfterClick);
    }
  }
  await element.dispose();
};
