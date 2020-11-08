module.exports = async function atomRun() {
  const { envName } = this.data;
  await this.envs.closeEnv(envName);
  await this.log({ text: `Environment '${envName}' close.` });
};
