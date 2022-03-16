import fs from "fs";
import promisify from "util.promisify";

import imageminGifsicle from "imagemin-gifsicle";
import imageminJpegtran from "imagemin-jpegtran";
import imageminOptipng from "imagemin-optipng";
import imageminSvgo from "imagemin-svgo";
import imageminWebp from "imagemin-webp";

import type { Plugin as ImageminPlugin } from 'imagemin';
import type { OptimizeOptions as SvgoOptions } from 'svgo';
import type { Options as WebpOptions } from 'imagemin-webp';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

type Tuple<Fn, Opt> = [ Fn, Opt ]
type Plugins = [
  Tuple<(opt: imageminGifsicle.Options) => ImageminPlugin, imageminGifsicle.Options>,
  Tuple<(opts: imageminJpegtran.Options) => ImageminPlugin, imageminJpegtran.Options>,
  Tuple<(opts: imageminOptipng.Options) => ImageminPlugin, imageminOptipng.Options>,
  Tuple<(opts: SvgoOptions) => ImageminPlugin, SvgoOptions>,
  Tuple<(opts: WebpOptions) => ImageminPlugin, WebpOptions>,
]
const plugins = ([
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
          active: false
        },
      ],
    },
  ],
  [
    imageminWebp,
    {
      quality: 75
    },
  ]
] as Plugins).map(([fn, opts]) => {
  if(typeof fn === 'function') {
    return fn(opts)
  }
});

const write = (filename: fs.PathOrFileDescriptor, data: NodeJS.ArrayBufferView) => writeFile(filename, data)

export const minifyFile = (filename: string) =>
  [
    ...plugins,
    write
  ]
    .reduce((acc, it) => acc.then(it), readFile(filename));
