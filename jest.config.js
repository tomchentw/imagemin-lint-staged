module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: [
    "\\d+\\.\\d+\\.\\d+"
  ],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules//(?!(imagemin-svgo|imagemin-gifsicle|imagemin-jpegtran|imagemin-optipng)/)"
  ]
};
