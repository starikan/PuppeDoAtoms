const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { browser = true, server } = this.options;

  this.log({ text: '*********** DEBUGGER ***********' });

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