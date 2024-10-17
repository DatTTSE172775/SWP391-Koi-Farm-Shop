const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    REST: {
      endpoint: 'http://localhost:5000/api', // Adjust this to your API's base URL
      defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    },
    JSONResponse: {}
  },
  include: {
    I: './steps_file.js'
  },
  name: 'koi-farm-shop'
}