module.exports = async function atomRun() {
  const { browser = true, server } = this.options;

  await this.log({ text: '*********** DEBUGGER ***********' });

  if (browser) {
    await this.page.evaluate(() => {
      console.log(this);
      debugger;
    });
  }
  if (server) {
    console.log(this);
    debugger;
  }
};