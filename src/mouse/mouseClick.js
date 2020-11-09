module.exports = async function atomRun() {
  const { X, Y } = this.data;

  const mouse = this.page.mouse;
  await mouse.click(X, Y);

  await this.log({ text: `Mouse click in coords: X = '${X}', Y = '${Y}'` });
};