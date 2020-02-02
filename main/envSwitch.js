const instance = new (require('@puppedo/atoms-core'))();
module.exports = { runTest: instance.runTest.bind(instance) };

// WRITE YOUR LOGIC BELLOW
instance.atomRun = async function() {
  const { envName } = this.data;
  await this.envs.setEnv(envName);
  await this.log({ text: `Environment switch on '${envName}'` });
};
