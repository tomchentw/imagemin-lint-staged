import fs from "fs";
import promisify from "util.promisify";
import imageminGifsicle from "imagemin-gifsicle";
import imageminJpegtran from "imagemin-jpegtran";
import imageminOptipng from "imagemin-optipng";
import imageminSvgo from "imagemin-svgo";
import imageminWebp from "imagemin-webp";
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const plugins = [
  [
    imageminGifsicle,
    {
      interlaced: true,
    },
  ],
  [
    imageminJpegtran,
    {
      progressive: true,
    },
  ],
  [
    imageminOptipng,
    {
      optimizationLevel: 5,
    },
  ],
  [
    imageminSvgo,
    {
      plugins: [
        {
          name: "removeViewBox",
          active: false,
        },
      ],
    },
  ],
  [
    imageminWebp,
    {
      quality: 75,
    },
  ],
].map(([fn, opts]) => {
  if (typeof fn === "function") {
    return fn(opts);
  }
});
export const minifyFile = (filename) =>
  [...plugins, (it) => writeFile(filename, it)].reduce(
    (acc, it) => acc.then(it),
    readFile(filename)
  );
