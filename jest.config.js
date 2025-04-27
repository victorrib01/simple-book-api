module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./src/tests/setup.js'],
    collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!src/server.js'],
  coverageDirectory: 'coverage'
  };
  