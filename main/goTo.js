module.exports = async function atomRun() {
  const { url } = this.data;
  await this.page.goto(url);
  await this.log({ text: `Go to: ${url}` });
};
