"use strict";

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _child_process = _interopRequireDefault(require("child_process"));

var _util = _interopRequireDefault(require("util.promisify"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const stat = (0, _util.default)(_fs.default.stat);
const exec = (0, _util.default)(_child_process.default.exec);
describe("index module", () => {
  const FILENAMES = "./src/__fixtures__/test.gif ./src/__fixtures__/test.jpg ./src/__fixtures__/test.png ./src/__fixtures__/test.svg".split(
    " "
  );

  const stats = () =>
    Promise.all(
      FILENAMES.map(async f => {
        const { size } = await stat(f);
        return {
          f,
          size
        };
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
