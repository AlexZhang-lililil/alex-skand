var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("name", {
      type: String,
      required: true,
      desc: "Project name",
    });

  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "list",
        name: "pipeline",
        message: "Select your pipeline",
        choices: ["github", "None"],
        default:"None"
      }
    ]);
  }

  writing() {
    if (this.answers.pipeline === "github") {
      this.fs.copy(
        this.templatePath("github-template/github/**"),
        this.destinationPath(this.options.name + "/.github/"),
        { globOptions: { dot: true } }
      );
    }
  }
};
