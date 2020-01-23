const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { time } = this.data;
  this.log({ text: `Waiting ${time} ms.` });
  await this.page.waitFor(time);
};