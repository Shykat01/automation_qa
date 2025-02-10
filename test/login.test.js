const { Builder, By, until } = require('selenium-webdriver');
const assert = require('chai').assert;
require('chromedriver');

describe('Login Test - locked_out_user', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('should show error message for locked_out_user', async function () {
    await driver.get('https://www.saucedemo.com/');

    await driver.findElement(By.id('user-name')).sendKeys('locked_out_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    await driver.wait(until.elementLocated(By.css('.error-message-container')), 5000);
    const errorMessage = await driver.findElement(By.css('.error-message-container')).getText();

    assert.include(errorMessage, 'Sorry, this user has been locked out.');
  });

  after(async function () {
    await driver.quit();
  });
});
