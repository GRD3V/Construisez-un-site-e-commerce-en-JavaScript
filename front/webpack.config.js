const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./js/main.js",
  },
  output: {
    filename: "kanap.bundle.js",
    path: path.resolve(__dirname, "js"),
  },
};
