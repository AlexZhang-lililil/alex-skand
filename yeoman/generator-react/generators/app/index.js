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
        type: "list",
        name: "infrastructure",
        message: "Select your infrastructure",
        choices: ["aws","google","None"],
        default:"None"
      },
    ]);
  }

  default() {
    if (this.answers.infrastructure !== "None") {
      this.composeWith(require.resolve("../pulumi"), {
        name: this.answers.name,
        infrastructure: this.answers.infrastructure
      });
    }
    this.composeWith(require.resolve("../pipeline"), {
      name: this.answers.name
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

  install() {
    this.spawnCommandSync("cd",[
      this.destinationPath(this.answers.name)
    ]);
    this.spawnCommandSync("pwd",[

    ]);
  }
};
