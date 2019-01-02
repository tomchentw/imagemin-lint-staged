import path from "path";
import fs from "fs";
import child_process from "child_process";
import promisify from "util.promisify";

const stat = promisify(fs.stat);
const exec = promisify(child_process.exec);

describe("index module", () => {
  const FILENAMES = "./lib/__fixtures__/test.gif ./lib/__fixtures__/test.jpg ./lib/__fixtures__/test.png ./lib/__fixtures__/test.svg".split(
    " "
  );

  const stats = () =>
    Promise.all(
      FILENAMES.map(async f => {
        const { size } = await stat(f);
        return { f, size };
      })
    );

  const { minifyFile } = require("../index");

  describe("minifyFile function", () => {
    it("should work as expected", async () => {
      const before = await stats();
      await Promise.all(FILENAMES.map(minifyFile));
      const after = await stats();
      await exec(`git checkout .`);
      expect(after).not.toEqual(before);

      expect(before).toMatchSnapshot();
      expect(after).toMatchSnapshot();
    });
  });
});
