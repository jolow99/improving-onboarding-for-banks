const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { assert } = require("chai");

Given("I have filled in my child name", async function(){
  await driver.findElement(By.className("display_name")).sendKeys("Salah Abbot");
  await driver.sleep(500);
})

When(/^I (.*) the autofill checkbox$/, async function (check) {
  const autofillCheckbox = await driver.findElement(By.className("autofill"));

  if (check == "check") {
    if (!autofillCheckbox.isSelected()) {
      autofillCheckbox.click();
    }
    var checked = await autofillCheckbox.isSelected();
    assert.equal(checked, true);
  } else if (check == "uncheck") {
    if (autofillCheckbox.isSelected()) {
      autofillCheckbox.click();
    }
    var checked = await autofillCheckbox.isSelected();
    assert.equal(checked, false);
  }
});

Then("I should see my child details autofilled", async function () {
    var childNumberValue = await driver
        .findElement(By.className("phone_number"))
        .getAttribute("value");
    assert.equal(childNumberValue, parentNumber);

    var childEmailValue = await driver
        .findElement(By.className("email"))
        .getAttribute("value");
    assert.equal(childEmailValue, "sally@gmail.com");

    await driver.findElement(By.className("next")).click();
    await driver.sleep(500);
});

When("I edit my child contact details", async function () {
    await driver.findElement(By.className("phone_number")).sendKeys(childNumber);
    await driver.findElement(By.className("email")).sendKeys("sarah@gmail.com");

    await driver.findElement(By.className("next")).click();
    await driver.sleep(500);
});

Then("I should be able to see that my child details are the same as mine",
  async function () {
    var childNumberValue = await driver
      .findElement(By.className("phone_number"))
      .getText();
    assert.equal(childNumberValue, parentNumber);

    var childEmailValue = await driver
      .findElement(By.className("email"))
      .getText();
    assert.equal(childEmailValue, "sally@gmail.com");
  }
);

Then("I should be able to see that my child details are different",
  async function () {
    var childNumberValue = await driver
      .findElement(By.className("phone_number"))
      .getText();
    assert.equal(childNumberValue, childNumber);

    var childEmailValue = await driver
      .findElement(By.className("email"))
      .getText();
    assert.equal(childEmailValue, "sarah@gmail.com");
  }
);
