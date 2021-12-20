module.exports = async function atomRun() {
  const fs = require('fs');
  const path = require('path');

  const { urlRegExp, fileName } = this.data;
  const outputFolderContext = this.data.outputFolderContext || false;
  const { folderLatestFull } = this.logOptions.output;

  const fileFullPath = outputFolderContext ? path.join(folderLatestFull, fileName) : fileName;

  if (this.getEngine('puppeteer')) {
    await this.page.setRequestInterception(true);
    this.page.on('request', (interceptedRequest) => {
      if (interceptedRequest.url().match(urlRegExp)) {
        const fileContent = fs.readFileSync(fileFullPath);
        const res = {
          headers: interceptedRequest.headers(),
          body: fileContent,
        };
        interceptedRequest.respond(res);
      } else {
        interceptedRequest.continue();
      }
    });
  } else if (this.getEngine('playwright')) {
    await this.page.route(new RegExp(urlRegExp), (route) => {
      const request = route.request();
      const fileContent = fs.readFileSync(fileFullPath);
      const res = {
        headers: request.headers(),
        body: fileContent.toString(),
      };
      route.fulfill(res);
    });
  } else {
    throw new Error(`There is unknown engine ${this.getEngine()}`);
  }

  await this.log({ text: `Request '${urlRegExp}' replace with file '${fileName}'` });
};
