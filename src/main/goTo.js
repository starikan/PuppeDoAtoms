module.exports = async function atomRun() {
  const { url, timeout = 30000 } = this.data;
  const allowError = this.options.allowError;

  try {
    await this.page.goto(url, {timeout});
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
