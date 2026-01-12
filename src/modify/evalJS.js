module.exports = async function atomRun() {
  const { js } = this.data;

  const data = await this.page.evaluate(js);
  await this.log({ text: `Evaluate JS: '${js}' with result '${data}'` });

  return { data };
};
