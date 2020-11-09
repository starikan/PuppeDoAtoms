module.exports = async function atomRun() {
  const { position, name } = this.data;

  const allPages = await this.browser.pages();
  if (['last', -1].includes(position)) {
    this.env.set(`state.pages.${name}`, allPages[allPages.length - 1]);
  } else {
    const numberResolved = parseInt(position) || 0;
    this.env.set(`state.pages.${name}`, allPages[numberResolved]);
  }

  await this.log({ text: `Page set name: '${name}'` });
};
