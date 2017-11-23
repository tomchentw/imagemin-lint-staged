"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minifyFile = void 0;

const fs = require("fs");

const promisify = require("util.promisify");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const plugins = [
  [
    "imagemin-gifsicle",
    {
      interlaced: true
    }
  ],
  [
    "imagemin-jpegtran",
    {
      progressive: true
    }
  ],
  [
    "imagemin-optipng",
    {
      optimizationLevel: 5
    }
  ],
  [
    "imagemin-svgo",
    {
      plugins: [
        {
          removeViewBox: false
        }
      ]
    }
  ]
].map(([name, opts]) => require(name)(opts));

const minifyFile = filename =>
  [...plugins, it => writeFile(filename, it)].reduce(
    (acc, it) => acc.then(it),
    readFile(filename)
  );

exports.minifyFile = minifyFile;
