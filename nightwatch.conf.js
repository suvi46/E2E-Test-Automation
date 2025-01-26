// Refer to the online docs for more details:
// https://nightwatchjs.org/gettingstarted/configuration/
//

//  _   _  _         _      _                     _          _
// | \ | |(_)       | |    | |                   | |        | |
// |  \| | _   __ _ | |__  | |_ __      __  __ _ | |_   ___ | |__
// | . ` || | / _` || '_ \ | __|\ \ /\ / / / _` || __| / __|| '_ \
// | |\  || || (_| || | | || |_  \ V  V / | (_| || |_ | (__ | | | |
// \_| \_/|_| \__, ||_| |_| \__|  \_/\_/   \__,_| \__| \___||_| |_|
//             __/ |
//            |___/

module.exports = {
  // An array of folders (excluding subfolders) where your tests are located;
  // if this is not specified, the test source must be passed as the second argument to the test runner.
  src_folders: ["tests", "nightwatch/examples"],

  // See https://nightwatchjs.org/guide/concepts/page-object-model.html
  page_objects_path: ["nightwatch/page-objects"],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-commands.html
  custom_commands_path: ["nightwatch/custom-commands"],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-assertions.html
  custom_assertions_path: ["nightwatch/custom-assertions"],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-plugins.html
  plugins: [],

  // See https://nightwatchjs.org/guide/concepts/test-globals.html
  globals_path: "",

  webdriver: {},

  test_workers: {
    enabled: true,
  },

  test_settings: {
    default: {
      disable_error_log: false,
      launch_url: "http://localhost",

      screenshots: {
        enabled: false,
        path: "screens",
        on_failure: true,
      },

      desiredCapabilities: {
        browserName: "chrome",
      },

      webdriver: {
        start_process: true,
        server_path: "",
      },

      test_runner: {
        // set mocha as the runner
        // For more info on using Mocha with Nightwatch, visit:
        // https://nightwatchjs.org/guide/writing-tests/using-mocha.html
        type: "mocha",

        // define mocha specific options
        options: {
          ui: "bdd",
          reporter: "list",
        },
      },
    },

    chrome: {
      desiredCapabilities: {
        browserName: "chrome",
        "goog:chromeOptions": {
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          args: [
            //'--no-sandbox',
            //'--ignore-certificate-errors',
            //'--allow-insecure-localhost',
            //'--headless=new'
          ],
        },
      },

      webdriver: {
        start_process: true,
        server_path: "",
        cli_args: [
          // --verbose
        ],
      },
    },

    "android.real.chrome": {
      desiredCapabilities: {
        real_mobile: true,
        browserName: "chrome",
        "goog:chromeOptions": {
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          //
          // w3c:false tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
          w3c: true,
          args: [
            //'--no-sandbox',
            //'--ignore-certificate-errors',
            //'--allow-insecure-localhost',
            //'--headless'
          ],
          androidPackage: "com.android.chrome",
          // add the device serial to run tests on, if multiple devices are online
          // Run command: `$ANDROID_HOME/platform-tools/adb devices`
          // androidDeviceSerial: ''
        },
      },

      webdriver: {
        start_process: true,
        server_path: "",
        cli_args: [
          // --verbose
        ],
      },
    },

    "android.emulator.chrome": {
      desiredCapabilities: {
        real_mobile: false,
        avd: "nightwatch-android-11",
        browserName: "chrome",
        "goog:chromeOptions": {
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          //
          // w3c:false tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
          w3c: true,
          args: [
            //'--no-sandbox',
            //'--ignore-certificate-errors',
            //'--allow-insecure-localhost',
            //'--headless'
          ],
          androidPackage: "com.android.chrome",
          // add the device serial to run tests on, if multiple devices are online
          // Run command: `$ANDROID_HOME/platform-tools/adb devices`
          // androidDeviceSerial: ''
        },
      },

      webdriver: {
        start_process: true,
        // path to chromedriver executable which can work with the factory
        // version of Chrome mobile browser on the emulator (version 83).
        server_path: "chromedriver-mobile/chromedriver.exe",
        cli_args: [
          // --verbose
        ],
      },
    },

    app: {
      selenium: {
        start_process: true,
        use_appium: true,
        host: "localhost",
        port: 4723,
        server_path: "",
        // args to pass when starting the Appium server
        cli_args: [
          // automatically download the required chromedriver
          // '--allow-insecure=chromedriver_autodownload'
        ],
        // Remove below line if using Appium v1
        default_path_prefix: "",
      },
      webdriver: {
        timeout_options: {
          timeout: 150000,
          retry_attempts: 3,
        },
        keep_alive: false,
        start_process: false,
      },
    },

    "app.android.emulator": {
      extends: "app",
      desiredCapabilities: {
        // More capabilities can be found at https://github.com/appium/appium-uiautomator2-driver#capabilities
        browserName: null,
        platformName: "android",
        // `appium:options` is not natively supported in Appium v1, but works with Nightwatch.
        // If copying these capabilities elsewhere while using Appium v1, make sure to remove `appium:options`
        // and add `appium:` prefix to each one of its capabilities, e.g. change 'app' to 'appium:app'.
        "appium:options": {
          automationName: "UiAutomator2",
          // Android Virtual Device to run tests on
          avd: "nightwatch-android-11",
          // While Appium v1 supports relative paths, it's more safe to use absolute paths instead.
          // Appium v2 does not support relative paths.
          app: `${__dirname}/nightwatch/sample-apps/wikipedia.apk`,
          appPackage: "org.wikipedia",
          appActivity: "org.wikipedia.main.MainActivity",
          appWaitActivity: "org.wikipedia.onboarding.InitialOnboardingActivity",
          // chromedriver executable to use for testing web-views in hybrid apps
          chromedriverExecutable: `${__dirname}/chromedriver-mobile/chromedriver.exe`,
          newCommandTimeout: 0,
        },
      },
    },

    "app.android.real": {
      extends: "app",
      desiredCapabilities: {
        // More capabilities can be found at https://github.com/appium/appium-uiautomator2-driver#capabilities
        browserName: null,
        platformName: "android",
        // `appium:options` is not natively supported in Appium v1, but works with Nightwatch.
        // If copying these capabilities elsewhere while using Appium v1, make sure to remove `appium:options`
        // and add `appium:` prefix to each one of its capabilities, e.g. change 'app' to 'appium:app'.
        "appium:options": {
          automationName: "UiAutomator2",
          // While Appium v1 supports relative paths, it's more safe to use absolute paths instead.
          // Appium v2 does not support relative paths.
          app: `E:\\APKBuildsTest\\app-merch-release.apk`,
          appPackage: "com.reactivapp.merch",
          appActivity: "com.reactivappmobilereactnative.MainActivity",
          appWaitActivity: "*",

          // 'chromedriver' binary is required while testing hybrid mobile apps.
          //
          // Set `chromedriverExecutable` to '' to use binary from `chromedriver` NPM package (if installed).
          // Or, put '--allow-insecure=chromedriver_autodownload' in `cli_args` property of `selenium`
          // config (see 'app' env above) to automatically download the required version of chromedriver
          // (delete `chromedriverExecutable` capability below in that case).
          chromedriverExecutable: "",
          newCommandTimeout: 0,
          // add device id of the device to run tests on, if multiple devices are online
          // Run command: `$ANDROID_HOME/platform-tools/adb devices` to get all connected devices
          // udid: '',
        },
      },
    },

    //////////////////////////////////////////////////////////////////////////////////
    // Configuration for using the browserstack.com cloud service                    |
    //                                                                               |
    // Please set the username and access key by setting the environment variables:  |
    // - BROWSERSTACK_USERNAME                                                       |
    // - BROWSERSTACK_ACCESS_KEY                                                     |
    // .env files are supported                                                      |
    //////////////////////////////////////////////////////////////////////////////////
    browserstack: {
      selenium: {
        host: "hub.browserstack.com",
        port: 443,
      },
      // More info on configuring capabilities can be found on:
      // https://www.browserstack.com/automate/capabilities?tag=selenium-4
      desiredCapabilities: {
        "bstack:options": {
          userName: "${BROWSERSTACK_USERNAME}",
          accessKey: "${BROWSERSTACK_ACCESS_KEY}",
        },
      },

      disable_error_log: true,
      webdriver: {
        timeout_options: {
          timeout: 60000,
          retry_attempts: 3,
        },
        keep_alive: true,
        start_process: false,
      },
    },

    "browserstack.local": {
      extends: "browserstack",
      desiredCapabilities: {
        "browserstack.local": true,
      },
    },

    "browserstack.chrome": {
      extends: "browserstack",
      desiredCapabilities: {
        browserName: "chrome",
        "goog:chromeOptions": {
          w3c: true,
        },
      },
    },

    "browserstack.local_chrome": {
      extends: "browserstack.local",
      desiredCapabilities: {
        browserName: "chrome",
      },
    },

    "browserstack.android.chrome": {
      extends: "browserstack",
      desiredCapabilities: {
        "bstack:options": {
          osVersion: "12.0",
          deviceName: "Samsung Galaxy S22",
        },
        browserName: "chrome",
        "goog:chromeOptions": {
          // w3c: false
        },
      },
    },

    "browserstack.ios.safari": {
      extends: "browserstack",
      desiredCapabilities: {
        browserName: "safari",
        "bstack:options": {
          osVersion: "15.5",
          deviceName: "iPhone 13",
        },
        browserName: "safari",
      },
    },
  },

  usage_analytics: {
    enabled: true,
    log_path: "./logs/analytics",
    client_id: "7a139609-7aba-4f1b-a66f-5d84508718f2",
  },
};
