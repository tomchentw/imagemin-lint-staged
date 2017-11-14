var gte = require("semver").gte;

var version = process.version;

if (gte(version, "8.0.0")) {
  module.exports = require("./index__8.0.0__.js");
} else {
  module.exports = require("./index__6.0.0__.js");
}
