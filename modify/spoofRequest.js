const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const fs = require('fs');

  const { urlregexp, filename } = this.data;

  await this.page.setRequestInterception(true);
  this.page.on('request', async interceptedRequest => {
    if (interceptedRequest.url().match(urlregexp)) {
      const fileContent = fs.readFileSync(filename);
      const res = {
        headers: interceptedRequest.headers(),
        body: fileContent,
      };
      interceptedRequest.respond(res);
    } else {
      interceptedRequest.continue();
    }
  });

  this.log({ text: `Request '${urlregexp}' replace with file '${filename}'` });
};

// module.exports = {
//   runTest: async function(args) {
//     const fs = require('fs');
//     const { page, data, log, levelIndent, _ } = args;

//     const urlregexp = _.get(data, 'urlregexp');
//     const filename = _.get(data, 'filename');

//     await page.setRequestInterception(true);
//     page.on('request', async interceptedRequest => {
//       if (interceptedRequest.url().match(urlregexp)) {
//         const fileContent = fs.readFileSync(filename);
//         const res = {
//           headers: interceptedRequest.headers(),
//           body: fileContent,
//         };
//         interceptedRequest.respond(res);
//       } else {
//         interceptedRequest.continue();
//       }
//     });

//     await log({
//       text: `Запрос ${urlregexp} заменен файлом ${filename}`,
//       screenshot: false,
//       level: 'raw',
//       levelIndent: levelIndent + 1,
//     });
//   },
// };
