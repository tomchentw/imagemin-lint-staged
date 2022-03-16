#!/usr/bin/env node
import { minifyFile } from "../lib/index.js";
Promise.all(process.argv.slice(2).map(minifyFile)).catch((e) => {
  console.error(e);
  process.exit(1);
});
