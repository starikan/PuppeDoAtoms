module.exports = async function atomRun() {
  const mouse = this.page.mouse;
  await mouse.down();

  await this.log({ text: 'Mouse down' });
};
