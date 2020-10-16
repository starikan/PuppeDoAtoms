module.exports = async function atomRun() {
  const { envName } = this.data;
  await this.log({ text: `Environment switch on '${envName}'` });
  await this.envs.setEnv(envName);
};
