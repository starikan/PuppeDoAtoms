module.exports = async function atomRun() {
  const { waitUntil = 'load' } = this.options;
  await this.page.waitForNavigation({ waitUntil });
  await this.log({ text: 'Waiting page load' });
};
