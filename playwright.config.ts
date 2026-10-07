require('dotenv').config();
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  reporter: 'html',
 use: {
  baseURL: 'https://www.saucedemo.com',
  screenshot: 'on',
  video: 'on',
  trace: 'on',
  launchOptions: { slowMo: 800 },
},
});
