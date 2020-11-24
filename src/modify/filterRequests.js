module.exports = async function atomRun() {
  let { filters } = this.data;
  filters = Array.isArray(filters) ? filters : [filters];

  if (this.getEngine('puppeteer')) {
    await this.page.setRequestInterception(true);
    this.page.on('request', async (interceptedRequest) => {
      if (filters.some((v) => interceptedRequest.url().match(v))) {
        interceptedRequest.abort();
      } else {
        interceptedRequest.continue();
      }
    });
  } else if (this.getEngine('playwright')) {
    for (let i = 0; i < filters.length; i++) {
      const urlRegExp = filters[i];
      await this.page.route(new RegExp(urlRegExp), (route) => {
        route.abort()
      });
    }
  } else {
    throw new Error(`There is unknown engine ${this.getEngine()}`);
  }

  await this.log({ text: `Filter requests enable with mask: '${JSON.stringify(filters)}'` });
};
