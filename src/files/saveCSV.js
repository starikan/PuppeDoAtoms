module.exports = async function atomRun() {
  const fs = require('fs');
  const path = require('path');

  const { folderFull, folderLatestFull } = this.logOptions.output;
  const { csvData, fileName } = this.data;
  const headers = this.data.headers || [];
  const folder = this.data.folder || folderLatestFull;

  const csvText = csvData.map((v) => v.join(',')).join('\n');
  const fileNameResolve = fileName.replace(/[^\w\d\.]/gi, '_');

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  fs.writeFileSync(path.join(folder, fileNameResolve), headers.join(',') + '\n' + csvText);
  if (!this.data.folder) {
    fs.copyFileSync(path.join(folder, fileNameResolve), path.join(folderFull, filePath));
  }

  await this.log({ text: `Write CSV: ${fileNameResolve}` });
};
