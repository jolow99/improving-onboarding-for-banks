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
const { expect, assert, AssertionError } = require("chai");
const { setDefaultTimeout } = require("@cucumber/cucumber");
const pactum = require("pactum");
const axios = require("axios");

let spec = pactum.spec();

// let baseUrl = "https://react-frontend-353408.as.r.appspot.com/";
let baseUrl = "http://localhost:3001/";

setDefaultTimeout(60 * 1000);

let driver;

Before(async function () {
  driver = initDriver();
  await driver.get(baseUrl);
  await driver.sleep(1000);
  await driver.executeScript(function () {
    localStorage.clear();
  });
  spec = pactum.spec();
});

After(async function () {
  await driver.quit();
});

Given("that I have saved my details", async function () {
  await driver.get(baseUrl);
  await driver.sleep(1000);
  const notACustomerYetButton = await driver.findElement(
    By.className("bg-red-500")
  );
  await notACustomerYetButton.click();
  await driver.sleep(1000);

  const familyButton = await driver.findElement(By.className("family-next"));
  await familyButton.click();
  await driver.sleep(1000);

  const displayNameField = await driver.findElement(
    By.className("parent_display_name")
  );
  displayNameField.sendKeys("Sally Abbotaa");
  await driver.sleep(1000);

  const parentEmail = await driver.findElement(By.className("parent_email"));
  parentEmail.sendKeys("sally@gmail.comabc");
  await driver.sleep(1000);

  const parentPhone = await driver.findElement(By.className("parent_number"));
  parentPhone.sendKeys("12345");
  await driver.sleep(1000);

  assert.equal(await driver.getCurrentUrl(), baseUrl + "details");

  const nextButton = await driver.findElement(By.className("next"));
  await nextButton.click();
  await driver.sleep(1000);

  assert.equal(await driver.getCurrentUrl(), baseUrl + "family");
});

Given("I add a new child", async function () {
  assert.equal(await driver.getCurrentUrl(), baseUrl + "family");

  const addChildButton = await driver.findElement(By.className("add"));
  await addChildButton.click();
  await driver.sleep(1000);

  var actual_url = await driver.getCurrentUrl();
  assert.equal(actual_url, baseUrl + "child");

  const childName = await driver.findElement(
    By.className("child_display_name")
  );
  childName.sendKeys("Salah Abbot");
});

When("I check the autofill checkbox", async function () {
  const autofillCheckbox = await driver.findElement(By.className("autofill"));

  if (!autofillCheckbox.isSelected()) {
    autofillCheckbox.click();
  }

  var checked = await autofillCheckbox.isSelected();
  assert.equal(checked, true);
});

Then("I should see my child details autofilled", async function () {
  const childNumber = await driver.findElement(By.className("child_number"));
  var childNumberValue = await childNumber.getAttribute("value");
  assert.equal(childNumberValue, "12345");

  var childEmail = await driver.findElement(By.className("child_email"));
  var childEmailValue = await childEmail.getAttribute("value");
  assert.equal(childEmailValue, "sally@gmail.comabc");
});

When("I uncheck the autofill checkbox", async function () {
  const autofillCheckbox = await driver.findElement(By.className("autofill"));

  if (autofillCheckbox.isSelected()) {
    autofillCheckbox.click();
  }

  var checked = await autofillCheckbox.isSelected();
  assert.equal(checked, false);
});

Then("I should see my child details as empty", async function () {
  const childNumber = await driver.findElement(By.className("child_number"));
  var childNumberValue = await childNumber.getAttribute("value");
  assert.equal(childNumberValue, "");

  var childEmail = driver.findElement(By.className("child_email"));
  var childEmailValue = await childEmail.getAttribute("value");
  assert.equal(childEmailValue, "");
});