module.exports = async function atomRun() {
  const fs = require('fs');
  const path = require('path');

  const { object, fileName, folder } = this.data;
  const { folderFull, folderLatestFull } = this.logOptions.output || {};

  const json = JSON.stringify(object, null, 2)

  if (folder) {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    fs.writeFileSync(path.join(folder, fileName), json);
    await this.log({ text: `Write file: ${path.join(folder, fileName)}` });
  }

  fs.writeFileSync(path.join(folderFull, fileName), json);
  fs.writeFileSync(path.join(folderLatestFull, fileName), json);
  await this.log({ text: `Write file: ${path.join(folderFull, fileName)}` });
};
