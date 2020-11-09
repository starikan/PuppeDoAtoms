module.exports = async function atomRun() {
  let { filters } = this.data;
  filters = Array.isArray(filters) ? filters : [filters];

  await this.page.setRequestInterception(true);
  this.page.on('request', async (interceptedRequest) => {
    if (filters.some((v) => interceptedRequest.url().match(v))) {
      interceptedRequest.abort();
    } else {
      interceptedRequest.continue();
    }
  });

  await this.log({ text: `Filter requests enable with mask: '${JSON.stringify(filters)}'` });
};
