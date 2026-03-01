/** @type {import('jest').Config} */
module.exports = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    testEnvironment: "node",

    transform: {
        "^.+\\.js$": "babel-jest",
    },
};
