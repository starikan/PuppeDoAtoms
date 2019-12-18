const Atom = require('../Atom');
const instance = new Atom();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  await this.log({
    text: `Environment Switch = ${this.data.envName}`,
    screenshot: false,
    fullpage: false,
    level: 'debug',
    levelIndent: this.levelIndent + 1,
  });
  await this.envs.setEnv(this.data.envName);
};
