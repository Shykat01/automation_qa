const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

describe('Checkout Test', function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
        await driver.get('https://www.saucedemo.com/');
    });

    after(async function () {
        await driver.quit();
    });

    it('should complete checkout and verify order', async function () {
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();

        await driver.wait(until.elementLocated(By.className('inventory_item')), 10000);

        await driver.findElement(By.css('.inventory_item:nth-child(1) .btn_inventory')).click();
        await driver.findElement(By.css('.inventory_item:nth-child(2) .btn_inventory')).click();
        await driver.findElement(By.css('.inventory_item:nth-child(3) .btn_inventory')).click();

        const cartButton = await driver.wait(until.elementLocated(By.className('shopping_cart_link')), 10000);
        await cartButton.click();

        const checkoutButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('checkout'))), 10000);
        await checkoutButton.click();

        await driver.findElement(By.id('first-name')).sendKeys('Abir');
        await driver.findElement(By.id('last-name')).sendKeys('Shykat');
        await driver.findElement(By.id('postal-code')).sendKeys('As123456');
        
        const continueButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('continue'))), 10000);
        await continueButton.click();

        const finishButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('finish'))), 10000);
        await finishButton.click();

        const confirmationMessage = await driver.findElement(By.css('.complete-header')).getText();
        expect(confirmationMessage.toUpperCase()).to.include('THANK YOU FOR YOUR ORDER'.toUpperCase());
    });
});
