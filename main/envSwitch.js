module.exports = async function atomRun() {
  const { envName } = this.data;
  await this.envs.setEnv(envName);
  await this.log({ text: `Environment switch on '${envName}'` });
};
