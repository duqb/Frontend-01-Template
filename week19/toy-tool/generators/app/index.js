var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  collecting() {
    console.log("collecting");
  }

  creating() {
    this.fs.copyTpl(this.templatePath("package.json"), this.destinationPath("package.json"), {
      title: "Templating with Yeoman",
    });
    this.fs.copyTpl(
      this.templatePath("webpack.config.js"),
      this.destinationPath("webpack.config.js")
    );
    this.fs.copyTpl(
      this.templatePath(".babelrc"),
      this.destinationPath(".babelrc")
    );
    this.fs.copyTpl(
      this.templatePath(".nycrc"),
      this.destinationPath(".nycrc")
    );

    this.fs.copyTpl(
      this.templatePath("lib/createElement.js"),
      this.destinationPath("lib/createElement.js")
    );
    this.fs.copyTpl(this.templatePath("lib/gesture.js"), this.destinationPath("lib/gesture.js"));
    this.fs.copyTpl(this.templatePath("src/main.js"), this.destinationPath("src/main.js"));
    this.fs.copyTpl(this.templatePath("src/index.html"), this.destinationPath("src/index.html"), {
      title: "Templating with Yeoman",
    });
    this.fs.copyTpl(
      this.templatePath("webpack.config.js"),
      this.destinationPath("webpack.config.js")
    );

    this.fs.copyTpl(
      this.templatePath("test/main.test.js"),
      this.destinationPath("test/main.test.js")
    );

    this.npmInstall(
      [
        "webpack",
        "webpack-cli",
        "webpack-dev-server",
        "html-webpack-plugin",
        "babel-loader",
        "@babel/core",
        "@babel/preset-env",
        "@babel/plugin-transform-react-jsx",
        "mocha",
        "nyc",
        "@babel/register",
        "@istanbuljs/nyc-config-babel",
        "babel-plugin-istanbul",
      ],
      {
        "save-dev": true,
      }
    );
  }
};