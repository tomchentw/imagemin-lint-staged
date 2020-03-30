"use strict";
const fs = require("fs");
const promisify = require("util.promisify");
const { cosmiconfigSync } = require("cosmiconfig");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const explorerSync = cosmiconfigSync("imagemin-lint-staged");
const { config } = explorerSync.search() || { config: false };

const gifsicleConfig =
  config && config.gifsicle
    ? config.gifsicle
    : {
        interlaced: true
      };

const jpegtranConfig =
  config && config.jpegtran
    ? config.jpegtran
    : {
        progressive: true
      };

const optipngConfig =
  config && config.optipng
    ? config.optipng
    : {
        optimizationLevel: 5
      };

const svgoConfig =
  config && config.svgo
    ? config.svgo
    : {
        plugins: [
          {
            removeViewBox: false
          }
        ]
      };

const plugins = [
  ["imagemin-gifsicle", gifsicleConfig],
  ["imagemin-jpegtran", jpegtranConfig],
  ["imagemin-optipng", optipngConfig],
  ["imagemin-svgo", svgoConfig]
].map(([name, opts]) => require(name)(opts));

const minifyFile = (exports.minifyFile = filename =>
  [...plugins, it => writeFile(filename, it)].reduce(
    (acc, it) => acc.then(it),
    readFile(filename)
  ));
