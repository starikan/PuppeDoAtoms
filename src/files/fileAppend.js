module.exports = async function atomRun() {
  const { fileName, string } = this.data;

  const fs = require('fs');
  fs.appendFileSync(fileName, string);

  await this.log({ text: `Append to file: '${fileName}' data: '${string}'` });
};
