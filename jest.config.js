export default {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.js', './src/tests/setup.js'], // <<< aqui!
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!src/server.js'],
  coverageDirectory: 'coverage',
  transform: {},
};
