const {
    Given,
    When,
    Then,
    Before,
    AfterAll,
    After,
  } = require("@cucumber/cucumber");
  const {
    Builder,
    By,
    Capabilities,
    Key,
    Button,
    ChromiumWebDriver,
  } = require("selenium-webdriver");
  const { initDriver } = require("../support/driverUtil");
  const { expect, assert } = require("chai");
  const { setDefaultTimeout } = require("@cucumber/cucumber");
  const pactum = require("pactum");
  
  let spec = pactum.spec();
  
  let base_url = "http://localhost:3000/";
  
  setDefaultTimeout(60 * 1000);
  
  let driver;
  
  Before(function () {
    driver = initDriver();
    spec = pactum.spec();
  });
  
  After(async function () {
    await driver.quit();
  });

  Given('I am on {string} and I have not filled in any fields', async function (page) {
    if (page == "details") {
        await driver.get(base_url)
        await driver.sleep(1000)

        const notACustomerYetButton = await driver.findElement(By.className("bg-red-500"))
        notACustomerYetButton.click();
        await driver.sleep(1000);
        
        const nextButton = await driver.findElement(By.className("next"))
        nextButton.click();
        await driver.sleep(1000);

        expect(await driver.getCurrentUrl()).to.equal(base_url + page)
    }
  });

  When('I click on {string}', async function (button) {
    driver.findElement(By.className(button)).click();
    await driver.sleep(1000);
  });

  Then('I should stay on {string}', async function (page) {
    // Get current url
    expect(await driver.getCurrentUrl()).to.equal(base_url + page);
  });

  Then('I should see {string}', async function (errors) {
    let error_elements = await driver.findElements(By.className("text-red-500"));
    let error_array = errors.split(",");
    expect(error_elements.length).to.equal(error_array.length);
    for (let i = 0; i < error_elements.length; i++) {
        let error_text = await error_elements[i].getText();
        expect(error_text).to.equal(error_array[i] + " is Required");
    }
  });
