var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument("name", {
      type: String,
      required: true,
      description: "Project name",
    });
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "confirm",
        name: "github",
        message: "Would you like to enable the Github Action?",
      },
    ]);
  }

  writing() {
    if (this.answers.github) {
      this.fs.copy(
        this.templatePath("github-template/github/**"),
        this.destinationPath(this.options.name + "/.github/"),
        { globOptions: { dot: true } }
      );
    }
  }
};
