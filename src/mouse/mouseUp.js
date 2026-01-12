module.exports = async function atomRun() {
  const mouse = this.page.mouse;
  await mouse.up();

  await this.log({ text: 'Mouse up' });
};
