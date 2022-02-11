module.exports = async function atomRun() {
  const { selector } = this.selectors;
  const { deltaLeftRight = 0, deltaUpDown = 0 } = this.data;

  const element = await this.getElement(selector);
  const boxElement = await element.boundingBox();
  const { x, y, width, height } = boxElement;

  const mouse = this.page.mouse;
  await mouse.move(x + width / 2, y + height / 2);

  if (deltaUpDown) {
    await mouse.wheel({ deltaY: deltaUpDown });
    await this.log({ text: `Mouse scroll vertical on selector '${selector}' on ${deltaUpDown} pixels`, element });
  }
  if (deltaLeftRight) {
    await mouse.wheel({ deltaX: deltaLeftRight });
    await this.log({ text: `Mouse scroll horizontal on selector '${selector}' on ${deltaLeftRight} pixels`, element });
  }
};
