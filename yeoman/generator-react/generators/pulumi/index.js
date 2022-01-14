var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument("name", {
            type: String,
            required: true,
            description: "Project name"
        })
    }

    async prompting() {
        this.answers = await this.prompt([
            {
                type: "list",
                name: "infrastructure",
                message: "Select your infrastructure",
                choices: ["aws","gcp","None"],
                default:"None"
            }
        ]);
    }

    writing() {
        if (this.answers.infrastructure !== "None"){
            this.fs.copy(
                this.templatePath("pulumi-template-"+ this.answers.infrastructure +"/**"),
                this.destinationPath(this.options.name+"/pulumi/"),
                { globOptions: { dot: true } }
            );
        }
    }
}
