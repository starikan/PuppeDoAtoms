module.exports = async function atomRun() {
  const { X, Y, dX, dY } = this.data;

  const mouse = this.page.mouse;
  const mouseX = mouse._x;
  const mouseY = mouse._y;

  if (!this._.isUndefined(dX) && !this._.isUndefined(dY)) {
    await mouse.move(mouseX + dX, mouseY + dY, { steps: 50 });
    await this.log({ text: `Mouse move on range dX = ${dX}, dY = ${dY}` });
  } else if (!this._.isUndefined(X) && !this._.isUndefined(Y)) {
    await mouse.move(X, Y);
    await this.log({ text: `Mouse move on position X = ${X}, Y = ${Y}` });
  } else {
    throw { message: 'Bad data. Must be X-Y or dX-dY.' };
  }
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, data, log, options, levelIndent, _ } = args;
//     const screenshot = _.get(options, 'screenshot', false);
//     const X = _.get(data, 'X');
//     const Y = _.get(data, 'Y');
//     const dX = _.get(data, 'dX');
//     const dY = _.get(data, 'dY');

//     const mouse = page.mouse;
//     const mouseX = mouse._x;
//     const mouseY = mouse._y;

//     if (!_.isUndefined(dX) && !_.isUndefined(dY)) {
//       await mouse.move(mouseX + dX, mouseY + dY, { steps: 50 });
//       await log({
//         text: `Мышь перемещена на расстоние X = ${dX}, Y = ${dY}`,
//         screenshot: screenshot,
//         fullpage: false,
//         level: 'raw',
//         levelIndent: levelIndent + 1,
//       });
//     } else if (!_.isUndefined(X) && !_.isUndefined(Y)) {
//       await mouse.move(X, Y);
//       await log({
//         text: `Мышь перемещена на позицию X = ${X}, Y = ${Y}`,
//         screenshot: screenshot,
//         fullpage: false,
//         level: 'raw',
//         levelIndent: levelIndent + 1,
//       });
//     } else {
//       throw {
//         message: 'Не передан нужный набор параметров. Должно быть сочетания X-Y или dX-dY',
//       };
//     }
//   },
// };
