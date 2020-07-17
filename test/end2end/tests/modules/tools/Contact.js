const webdriver = require("selenium-webdriver"),
    {expect} = require("chai"),
    {initDriver} = require("../../../library/driver"),
    {isMobile, isMaster, isCustom, isDefault} = require("../../../settings"),
    {logBrowserstackUrlToTest} = require("../../../library/utils"),
    {By, until} = webdriver;

/**
 * Tests regarding measure tool.
 * TODO to be tested from mobile mode
 * TODO to be tested from OB mode
 * TODO to be tested from 3D mode
 * @param {e2eTestParams} params parameter set
 * @returns {void}
 */
async function ContactTests ({builder, url, resolution, capability, description}) {
    // for a start, testing from 2D desktop mode
    const testIsApplicable = !isMobile(resolution) && (
        isMaster(url) || isCustom(url) || isDefault(url)
    );

    if (testIsApplicable) {
        describe("Contact", function () {
            const windowWidth = 500,
                windowHeight = 420;
            let driver, navBarIcon, toolWindow,
                nameInput, mailInput, telInput, textInput, submitButton;

            before(async function () {
                if (capability) {
                    capability.name = `Contact : ${this.currentTest.title} - ${description}`;
                    builder.withCapabilities(capability);
                }
                driver = await initDriver(builder, url, resolution);
            });

            after(async function () {
                if (capability) {
                    driver.session_.then(function (sessionData) {
                        logBrowserstackUrlToTest(sessionData.id_);
                    });
                }
                await driver.quit();
            });

            it("clicking menu entry opens contact form", async function () {
                navBarIcon = await driver.findElement(By.css("div#navbarRow li.dropdown span.glyphicon-envelope"));
                await navBarIcon.click();

                toolWindow = await driver.wait(until.elementLocated(By.css("div#window")));
                await driver.wait(until.elementIsVisible(toolWindow));
            });

            it("contact form holds fields name, mail, telephone, and text, and has submit button", async function () {
                const cssPrefix = "div.win-body div.contact";

                nameInput = (await driver.findElements(By.css(`${cssPrefix} div#contactNameDiv input#contactName`)))[0];
                mailInput = (await driver.findElements(By.css(`${cssPrefix} div#contactEmailDiv input#contactEmail`)))[0];
                telInput = (await driver.findElements(By.css(`${cssPrefix} div#contactTelDiv input#contactTel`)))[0];
                textInput = (await driver.findElements(By.css(`${cssPrefix} div#textDiv textarea#contactText`)))[0];
                submitButton = (await driver.findElements(By.css(`${cssPrefix} button.contactButton`)))[0];

                expect(nameInput).to.exist;
                expect(mailInput).to.exist;
                expect(telInput).to.exist;
                expect(textInput).to.exist;
                expect(submitButton).to.exist;
            });

            it("values can be entered in the fields", async function () {
                // wait a second for animation to finish - needed in Chrome
                await driver.wait(new Promise(r => setTimeout(r, 1000)));

                await nameInput.clear();
                await nameInput.sendKeys("Bob Ross");
                expect(await nameInput.getAttribute("value")).to.equal("Bob Ross");

                await mailInput.clear();
                await mailInput.sendKeys("bob_ross@example.com");
                expect(await mailInput.getAttribute("value")).to.equal("bob_ross@example.com");

                await telInput.clear();
                await telInput.sendKeys("55555555");
                expect(await telInput.getAttribute("value")).to.equal("55555555");

                await textInput.clear();
                await textInput.sendKeys("Test crashed? A happy little mistake.");
                expect(await textInput.getAttribute("value")).to.equal("Test crashed? A happy little mistake.");
            });

            it("making the view smaller keeps form in window", async function () {
                await driver.manage().window().setRect({width: windowWidth, height: windowHeight});

                const {height, width, x, y} = await toolWindow.getRect();

                // left and right border of tool within window
                expect(x).to.be.greaterThan(0).and.to.be.lessThan(windowWidth);
                expect(x + width).to.be.greaterThan(0).and.to.be.lessThan(windowWidth);
                // top and bottom border of tool within window
                expect(y).to.be.greaterThan(0).and.to.be.lessThan(windowHeight);
                expect(y + height).to.be.greaterThan(0).and.to.be.lessThan(windowHeight);
            });
        });
    }
}

module.exports = ContactTests;
