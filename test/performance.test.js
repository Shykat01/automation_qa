const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
require('chromedriver');

describe('Performance Glitch Checkout', function () {
    let driver;

    this.timeout(10000);

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://www.saucedemo.com/');
    });

    after(async function () {
        await driver.quit();
    });

    it('should complete checkout for performance_glitch_user', async function () {
        await driver.findElement(By.id('user-name')).sendKeys('performance_glitch_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();

        await driver.wait(until.elementLocated(By.className('inventory_item')), 10000);

        await driver.findElement(By.css('.inventory_item:nth-child(1) .btn_inventory')).click();
        await driver.findElement(By.css('.inventory_item:nth-child(2) .btn_inventory')).click();

        await driver.findElement(By.className('shopping_cart_link')).click();
        await driver.findElement(By.id('checkout')).click();

        await driver.findElement(By.id('first-name')).sendKeys('Abir');
        await driver.findElement(By.id('last-name')).sendKeys('Shykat');
        await driver.findElement(By.id('postal-code')).sendKeys('As123456');
        await driver.findElement(By.id('continue')).click();

        await driver.findElement(By.id('finish')).click();
        const confirmationMessage = await driver.findElement(By.css('.complete-header')).getText();
        expect(confirmationMessage).to.include('THANK YOU FOR YOUR ORDER');
    });
});
