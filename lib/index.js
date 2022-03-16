"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.minifyFile = void 0;
const fs_1 = __importDefault(require("fs"));
const util_promisify_1 = __importDefault(require("util.promisify"));
const imagemin_gifsicle_1 = __importDefault(require("imagemin-gifsicle"));
const imagemin_jpegtran_1 = __importDefault(require("imagemin-jpegtran"));
const imagemin_optipng_1 = __importDefault(require("imagemin-optipng"));
const imagemin_svgo_1 = __importDefault(require("imagemin-svgo"));
const imagemin_webp_1 = __importDefault(require("imagemin-webp"));
const readFile = (0, util_promisify_1.default)(fs_1.default.readFile);
const writeFile = (0, util_promisify_1.default)(fs_1.default.writeFile);
const plugins = [
    [
        imagemin_gifsicle_1.default,
        {
            interlaced: true,
        },
    ],
    [
        imagemin_jpegtran_1.default,
        {
            progressive: true,
        },
    ],
    [
        imagemin_optipng_1.default,
        {
            optimizationLevel: 5,
        },
    ],
    [
        imagemin_svgo_1.default,
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
        imagemin_webp_1.default,
        {
            quality: 75
        },
    ]
].map(([fn, opts]) => {
    if (typeof fn === 'function') {
        return fn(opts);
    }
});
const write = (filename, data) => writeFile(filename, data);
const minifyFile = (filename) => [
    ...plugins,
    write
]
    .reduce((acc, it) => acc.then(it), readFile(filename));
exports.minifyFile = minifyFile;
