var Generator = require('yeoman-generator');
const yaml = require('js-yaml');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option("name", {
            type: String,
            required: true,
            desc: "Project name",
        });

        this.option("infrastructure", {
            type: String,
            required: true,
            default: "None",
            desc: "Name of infrastructure"
        });
    }

    async prompting() {
        if (this.options.infrastructure === "aws") {
            this.answers = await this.prompt([
                {
                    type: "input",
                    name: "region",
                    message: "Your AWS-region",
                    default: "us-west-2",
                }
            ]);
        }
        else if (this.options.infrastructure === "google") {
            this.answers = await this.prompt([
                {
                    type: "input",
                    name: "gcpName",
                    message: "Your google project",
                    default: "",
                }
            ]);
        }
    }

    writing() {
        if (this.options.infrastructure === "aws") {

            this.fs.copy(
                this.templatePath("pulumi-template-aws" + "/**"),
                this.destinationPath(this.options.name+"/pulumi/"),
                { globOptions: { dot: true } }
            );

            let conf = {
                config: {
                    "aws:region": this.answers.region
                }
            }

            let yamlStr = yaml.dump(conf);
            this.fs.write(this.destinationPath(this.options.name+"/pulumi/Pulumi.dev.yaml"),yamlStr);
        }

        if (this.options.infrastructure === "google") {

            this.fs.copy(
                this.templatePath("pulumi-template-gcp" + "/**"),
                this.destinationPath(this.options.name+"/pulumi/"),
                { globOptions: { dot: true } }
            );

            let conf = {
                config: {
                    "gcp:project": this.answers.gcpName
                }
            }

            let yamlStr = yaml.dump(conf);
            this.fs.write(this.destinationPath(this.options.name+"/pulumi/Pulumi.dev.yaml"),yamlStr);
        }
    }
}
