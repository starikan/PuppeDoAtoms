module.exports = async function atomRun() {
  const { selector } = this.selectors;
  const element = await this.getElement(selector);

  const boxElement = await element.boundingBox();
  const { x, y, width, height } = boxElement;

  await this.log({ text: `Selector '${selector}' coords: X = ${x}, Y = ${y}, WIDTH = ${width}, HEIGHT = ${height}` });

  return { x, y, width, height };
};
