module.exports = async function atomRun() {
  const { css } = this.data;
  await this.page.addStyleTag({ content: css });
  await this.log({ text: `CSS inject on the page: ${css}` });
};
