var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("babel");
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: "default",
      },
      {
        type: "confirm",
        name: "confirm React",
        message: "Would you like create this app?",
      },
    ]);
  }

  default() {
    this.composeWith(require.resolve("../pipeline"), {
      arguments: [this.answers.name],
    });
    this.composeWith(require.resolve("../pulumi"), {
      arguments: [this.answers.name],
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath("react-app-template/**"),
      this.destinationPath(this.answers.name + "/"),
      { globOptions: { dot: true } }
    );

    const pkgJson = {
      name: this.answers.name,
    };

    this.fs.extendJSON(
      this.destinationPath(this.answers.name + "/package.json"),
      pkgJson
    );
  }
};
