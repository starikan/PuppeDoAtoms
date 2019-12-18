class Atom {
  constructor() {}

  async atomRun() {
    console.log('Empty Atom Run');
  }

  async runTest(args = {}) {
    try {
      this.envsId = args.envsId;
      this.envName = args.envName;
      this.envPageName = args.envPageName;
      this.data = args.data;
      this.selectors = args.selectors;
      this.options = args.options;
      this.allowResults = args.allowResults;
      this.bindResults = args.bindResults;
      this.levelIndent = args.levelIndent;
      this.repeat = args.repeat;
      this.stepId = args.stepId;
      this.env = args.env;
      this.envs = args.envs;
      this.browser = args.browser;
      this.page = args.page;
      this.helper = args.helper;
      this._ = args._;
      this.name = args.name;
      this.description = args.description;

      this.screenshot = (this.options || {})['screenshot'] || false;
      this.fullpage = (this.options || {})['fullpage'] || false;
      this.level = (this.options || {})['level'] || 'debug';
      this.log = function(cusomLog) {
        args.log({
          ...{
            screenshot: this.screenshot,
            fullpage: this.fullpage,
            level: this.level,
            levelIndent: this.levelIndent + 1,
          },
          ...cusomLog,
        });
      };

      await this.atomRun();
    } catch (error) {
      throw { message: `Error in Atom` };
    }
  }
}

module.exports = Atom;
