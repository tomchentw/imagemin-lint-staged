"use strict";

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _child_process = _interopRequireDefault(require("child_process"));

var _util = _interopRequireDefault(require("util.promisify"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }
      function _next(value) {
        step("next", value);
      }
      function _throw(err) {
        step("throw", err);
      }
      _next();
    });
  };
}

const stat = (0, _util.default)(_fs.default.stat);
const exec = (0, _util.default)(_child_process.default.exec);
describe("index module", () => {
  const FILENAMES = "./src/__fixtures__/test.gif ./src/__fixtures__/test.jpg ./src/__fixtures__/test.png ./src/__fixtures__/test.svg".split(
    " "
  );

  const stats = () =>
    Promise.all(
      FILENAMES.map(
        (() => {
          var _ref = _asyncToGenerator(function*(f) {
            const _ref2 = yield stat(f),
              size = _ref2.size;

            return {
              f,
              size
            };
          });

          return function(_x) {
            return _ref.apply(this, arguments);
          };
        })()
      )
    );

  const _require = require("../index"),
    minifyFile = _require.minifyFile;

  describe("minifyFile function", () => {
    it(
      "should work as expected",
      _asyncToGenerator(function*() {
        const before = yield stats();
        yield Promise.all(FILENAMES.map(minifyFile));
        const after = yield stats();
        yield exec(`git checkout .`);
        expect(after).not.toEqual(before);
        expect(before).toMatchSnapshot();
        expect(after).toMatchSnapshot();
      })
    );
  });
});
