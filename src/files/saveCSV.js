module.exports = async function atomRun() {
  const fs = require('fs');
  const path = require('path');

  const { folderFull, folderLatestFull } = this.logOptions.output;
  const { csvData, fileName } = this.data;
  const headers = this.data.headers || [];
  const folder = this.data.folder || folderLatestFull;

  const csvText = csvData.map((v) => v.join(',')).join('\n');

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  fs.writeFileSync(path.join(folder, fileName), headers.join(',') + '\n' + csvText);
  if (!this.data.folder) {
    fs.copyFileSync(path.join(folder, fileName), path.join(folderFull, filePath));
  }

  await this.log({ text: `Write CSV: ${fileName}` });
};
