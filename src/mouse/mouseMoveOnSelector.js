module.exports = async function atomRun() {
  const { selector } = this.selectors;
  const { dX = 10, dY = 10 } = this.data;

  const element = await this.getElement(selector);
  const boxElement = await element.boundingBox();
  const elementX = boxElement.x;
  const elementY = boxElement.y;

  const mouse = this.page.mouse;
  await mouse.move(elementX + dX, elementY + dY);

  await this.log({
    text: `Mouse move on selector '${selector}' with gap from top rigth corner dX = ${dX}, dY = ${dY}`,
    element,
  });
};
