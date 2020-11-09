module.exports = async function atomRun() {
  if (this.getEngine('puppeteer')) {
    const { width, height, deviceScaleFactor, isMobile, hasTouch, isLandscape } = await this.page.viewport();
    await this.log({ text: `Getting window attributes width='${width}', height='${height}'` });
    return { width, height, deviceScaleFactor, isMobile, hasTouch, isLandscape };
  } else if (this.getEngine('playwright')) {
    const {
      width,
      height,
      deviceScaleFactor = 'Not implemented in Playwright',
      isMobile = 'Not implemented in Playwright',
      hasTouch = 'Not implemented in Playwright',
      isLandscape = 'Not implemented in Playwright',
    } = await this.page.viewportSize();
    await this.log({ text: `Getting window attributes width='${width}', height='${height}'` });
    return { width, height, deviceScaleFactor, isMobile, hasTouch, isLandscape };
  } else {
    throw new Error(`There is unknown engine ${this.getEngine()}`);
  }
};
