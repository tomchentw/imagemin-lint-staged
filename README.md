# imagemin-lint-staged
> imagemin CLI designed for lint-staged usage with sensible defaults

[![Version][npm-image]][npm-url] [![PR Workflow][github-workflows-pr-image]][github-workflows-pr-url]


## Installation

```sh
npm i --save-dev imagemin-lint-staged
```

## Usage

Use in conjuntion with [lint-staged][lint-staged]. In your `package.json`

```json
  "lint-staged": {
    "*.{png,jpeg,jpg,gif,svg}": ["imagemin-lint-staged"]
  },
```


## Options

N/A


## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


[lint-staged]: https://github.com/okonet/lint-staged
[npm-image]: https://img.shields.io/npm/v/imagemin-lint-staged.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/imagemin-lint-staged

[github-workflows-pr-image]: https://github.com/davidsneighbour/imagemin-lint-staged/actions/workflows/pr.yml/badge.svg
[github-workflows-pr-url]: https://github.com/davidsneighbour/imagemin-lint-staged/actions/workflows/pr.yml
