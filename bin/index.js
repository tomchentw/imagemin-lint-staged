#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../lib/index.js");
Promise.all(process.argv.slice(2).map(index_js_1.minifyFile))
    .catch(e => {
    console.error(e);
    process.exit(1);
});
