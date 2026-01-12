module.exports = async function atomRun() {
  const { js, jsFile } = this.data;

  if (jsFile) {
    await this.page.addScriptTag({ path: jsFile });
    await this.log({ text: `JS inject on page: ${jsFile}` });
  } else if (js) {
    await this.page.addScriptTag({ content: js });
    await this.log({ text: `JS inject on page ${js}` });
  } else {
    await this.log({ text: `Can't add JS on the page. No any data.`, level: 'error' });
  }
};
