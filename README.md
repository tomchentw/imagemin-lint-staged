# imagemin-lint-staged
> imagemin CLI designed for lint-staged usage with sensible defaults

[![Version][npm-image]][npm-url] [![Travis CI][travis-image]][travis-url] [![Quality][codeclimate-maintainability-image]][codeclimate-maintainability-url] [![Coverage][codeclimate-c-image]][codeclimate-c-url] [![Dependencies][gemnasium-image]][gemnasium-url] [![Gitter][gitter-image]][gitter-url]


## Installation

```sh
npm i --save-dev imagemin-lint-staged
```

## Usage

Use in conjuntion with [lint-staged][lint-staged]. In your `package.json`

```json
  "lint-staged": {
    "*.{png,jpeg,jpg,gif,svg}": ["imagemin-lint-staged", "git add"]
  },
```


## Options

N/A


## Contributing

[![devDependency Status][david-dm-image]][david-dm-url]

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


[lint-staged]: https://github.com/okonet/lint-staged
[npm-image]: https://img.shields.io/npm/v/imagemin-lint-staged.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/imagemin-lint-staged

[travis-image]: https://img.shields.io/travis/tomchentw/imagemin-lint-staged.svg?style=flat-square
[travis-url]: https://travis-ci.org/tomchentw/imagemin-lint-staged
[codeclimate-maintainability-image]: https://img.shields.io/codeclimate/maintainability/tomchentw/imagemin-lint-staged.svg?style=flat-square
[codeclimate-maintainability-url]: https://codeclimate.com/github/tomchentw/imagemin-lint-staged
[codeclimate-c-image]: https://img.shields.io/codeclimate/c/tomchentw/imagemin-lint-staged.svg?style=flat-square
[codeclimate-c-url]: https://codeclimate.com/github/tomchentw/imagemin-lint-staged
[gemnasium-image]: https://img.shields.io/gemnasium/tomchentw/imagemin-lint-staged.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/tomchentw/imagemin-lint-staged
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/tomchentw/imagemin-lint-staged?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[david-dm-image]: https://img.shields.io/david/dev/tomchentw/imagemin-lint-staged.svg?style=flat-square
[david-dm-url]: https://david-dm.org/tomchentw/imagemin-lint-staged#info=devDependencies
