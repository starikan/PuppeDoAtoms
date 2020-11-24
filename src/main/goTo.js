module.exports = async function atomRun() {
  const { url } = this.data;
  const allowError = this.options.allowError;

  try {
    await this.page.goto(url);
    await this.log({ text: `Go to: ${url}` });
  } catch (error) {
    if (allowError) {
      await this.log({ text: `Go to BREAKS: ${url}` });
      return { success: false };
    }

    throw error;
  }
  return { success: true };
};
