module.exports = {
  runTest: async function(args) {
    const { page, data, log, options, helper, levelIndent, _ } = args;
    let option = helper.anyGet(data, 'options');
    const screenshot = _.get(options, 'screenshot', false);
    let X = _.get(data, 'X');
    let Y = _.get(data, 'Y');
    let dX = _.get(data, 'dX');
    let dY = _.get(data, 'dY');

    const mouse = page.mouse;
    const mouseX = mouse._x;
    const mouseY = mouse._y;

    if (!_.isUndefined(dX) && !_.isUndefined(dY)) {
      await mouse.move(mouseX + dX, mouseY + dY, { steps: 50 });
      await log({
        text: `Мышь перемещена на расстоние X = ${dX}, Y = ${dY}`,
        screenshot: screenshot,
        fullpage: false,
        level: 'raw',
        levelIndent,
      });
    } else if (!_.isUndefined(X) && !_.isUndefined(Y)) {
      await mouse.move(X, Y);
      await log({
        text: `Мышь перемещена на позицию X = ${X}, Y = ${Y}`,
        screenshot: screenshot,
        fullpage: false,
        level: 'raw',
        levelIndent,
      });
    } else {
      throw {
        message: `Не передан нужный набор параметров. Должно быть сочетания X-Y или dX-dY`,
      };
    }
  },
};
