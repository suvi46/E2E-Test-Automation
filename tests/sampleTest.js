
// module.exports = {
//   "Verify app launch": async function (browser) {
//     const appTitle =
//       '//android.view.ViewGroup[@resource-id="onboarding-welcome-continue-button"]';

//     await browser
//       .useXpath()
//       .waitForElementVisible(appTitle, 10000)
//       .assert.visible(appTitle, "App title is displayed")
//       .end();
//   },
// };

describe("App Launch demo test for Mocha", function () {
  describe("with Nightwatch", function () {
    before(function (browser, done) {
      done();
    });

    after(function (browser, done) {
      browser.end(function () {
        done();
      });
    });

    afterEach(function (browser, done) {
      done();
    });

    beforeEach(function (browser, done) {
      done();
    });

    it("uses BDD to run the App Launch test", function (browser) {
      const appTitle =
        '//android.view.ViewGroup[@resource-id="onboarding-welcome-continue-button"]';

      browser
        .useXpath()
        .waitForElementVisible(appTitle, 10000)
        .assert.visible(appTitle, "App title is displayed");
    });
  });
});
