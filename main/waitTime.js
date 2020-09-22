module.exports = async function atomRun() {
  const { time } = this.data;
  await this.log({ text: `Waiting ${time} ms.` });
  await this.page.waitFor(time);
};