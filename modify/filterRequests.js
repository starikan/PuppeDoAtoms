module.exports = async function atomRun() {
  let { filters } = this.data;
  filters = this._.isArray(filters) ? filters : [filters];

  await this.page.setRequestInterception(true);
  this.page.on('request', async interceptedRequest => {
    if (filters.some(v => interceptedRequest.url().match(v))) {
      interceptedRequest.abort();
    } else {
      interceptedRequest.continue();
    }
  });

  await this.log({ text: `Filter requests enable with mask: '${JSON.stringify(filters)}'` });
};

// module.exports = {
//   runTest: async function(args) {
//     const { page, data, log, levelIndent, _ } = args;

//     const filters = _.get(data, 'filters');

//     await page.setRequestInterception(true);
//     page.on('request', async interceptedRequest => {
//       if (filters.some(v => interceptedRequest.url().match(v))) {
//         interceptedRequest.abort();
//       } else {
//         interceptedRequest.continue();
//       }
//     });

//     await log({
//       text: `Включена фильтрация запросов по маскам: ${JSON.stringify(filters)}`,
//       screenshot: false,
//       level: 'raw',
//       levelIndent: levelIndent + 1,
//     });
//   },
// };
