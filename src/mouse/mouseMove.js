module.exports = async function atomRun() {
  const X = this.data.X || 0;
  const Y = this.data.Y || 0;
  const dX = this.data.dX || 0;
  const dY = this.data.dY || 0;

  const mouse = this.page.mouse;
  const mouseX = mouse._x;
  const mouseY = mouse._y;

  if (dX && dY) {
    await mouse.move(mouseX + dX, mouseY + dY, { steps: 50 });
    await this.log({ text: `Mouse move on range dX = ${dX}, dY = ${dY}` });
  } else if (X && Y) {
    await mouse.move(X, Y);
    await this.log({ text: `Mouse move on position X = ${X}, Y = ${Y}` });
  } else {
    throw { message: 'Bad data. Must be X-Y or dX-dY.' };
  }
};
