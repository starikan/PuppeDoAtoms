module.exports = async function atomRun() {
  const { url } = this.data;
  const allPages = await this.browser.pages();
  const exist = allPages.map((page) => page.url().includes(url)).some((v) => v);

  if (exist) {
    await this.log({ text: `URL found: '${url}'` });
  } else {
    await this.log({ text: `URL not found: '${url}'`, level: 'error' });
  }
  return { exists };
};
