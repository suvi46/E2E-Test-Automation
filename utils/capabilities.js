const config = require("./config");
require("dotenv").config();

const commonCapabilities = {
  isRealMobile: true,
  deviceOrientation: "PORTRAIT",
  console: true,
  network: false,
  visual: true,
  devicelog: true,
  //   user: config.LT_USERNAME,
  //   accessKey: config.LT_ACCESS_KEY,
};

const androidDevices = [
  {
    deviceName: "Moto g34 5G",
    platformVersion: "14.0",
    udid: "ZD222K8DN2",
    app: "E:\\E2E-Test-Automation\\testBuilds\\app-merch-release.apk",
  },
  {
    deviceName: "Galaxy S23 Ultra",
    platformVersion: "13.0",
  },
];

const iOSDevices = [
  {
    deviceName: "iPhone 15",
    platformVersion: "17.0",
  },
  {
    deviceName: "iPhone 16 Pro",
    platformVersion: "18.0",
  },
];
// Generate build name dynamically
const generateBuildName = (platformName, appUrl) => {
  const formattedPlatformName =
    platformName.charAt(0).toUpperCase() + platformName.slice(1);
  const urlSegment = appUrl ? appUrl.split("/").pop() : "No URL Provided";
  return `${formattedPlatformName}:ReactMerch AppRun - ${urlSegment}`;
};
const getCapabilities = (devices, platformName, appUrl) =>
  devices.map((device) => ({
    platformName: platformName,
    "appium:options": {
      ...commonCapabilities,
      platformName: platformName,
      automationName: platformName === "android" ? "UiAutomator2" : "XCUITest",
      deviceName: device.deviceName,
      udid: device.udid,
      platformVersion: device.platformVersion,
      app: device.app,
      build: generateBuildName(platformName, appUrl), // Dynamic build name
      name: device.deviceName, // Set device name here
    },
  }));

const androidCapabilities = getCapabilities(
  androidDevices,
  "android",
  config.ANDROID_APP_URL
);
const iOSCapabilities = getCapabilities(iOSDevices, "iOS", config.IOS_APP_URL);

module.exports = { androidCapabilities, iOSCapabilities };
