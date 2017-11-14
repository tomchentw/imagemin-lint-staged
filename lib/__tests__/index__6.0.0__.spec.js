const path = require("path");

const fs = require("fs");

const _require = require("child_process"),
  execSync = _require.execSync;

describe("index module", () => {
  const FILENAMES =
    "./src/__fixtures__/test.gif ./src/__fixtures__/test.jpg ./src/__fixtures__/test.png ./src/__fixtures__/test.svg";

  const stats = () =>
    FILENAMES.split(" ").map(f => ({
      f,
      size: fs.statSync(f).size
    }));

  it("should work as expected", () => {
    const before = stats();
    execSync(`node ./src/index.js ${FILENAMES}`);
    const after = stats();
    expect(after).not.toEqual(before);
    expect(before).toMatchSnapshot();
    expect(after).toMatchSnapshot();
  });
});
