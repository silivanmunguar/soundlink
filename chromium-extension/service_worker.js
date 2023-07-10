"use strict";

let defaultService;

async function init() {
  defaultService = await getDefaultService();
}

// get user defualt setting from storage
function getDefaultService() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("userSettings", (data) => {
      const userSettings = data.userSettings;
      if (userSettings && userSettings.defaultService) {
        console.log("User settings retrieved:", userSettings.defaultService);
        resolve(userSettings.defaultService);
      } else {
        reject("No default service found");
      }
    });
  });
}

// udpate user settings in storage if the user changes the default service
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.userSettings) {
    const userSettings = changes.userSettings.newValue;
    defaultService = userSettings.defaultService;
  }
});

// listen for rule matches from the background script
chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(async (e) => {
  console.log("Rule matched: ", e.request.url);

  // if the user has no default service do nothing
  if (!defaultService) {
    console.log("No default service found");
    return;
  }

  // if the current link is not the default service
  if (!e.request.url.includes(defaultService)) {
    // get the track data from the api
    // const apiurl = "https://soundlink-api.onrender.com/api/track?";
    const apiurl = "http://localhost:3001/api/track?";

    // request body
    const body = {
      url: e.request.url,
      defaultService: defaultService,
    };

    // make a post request to the api to get the track data
    try {
      const data = await fetch(apiurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => res.json());
      // redirect to the track page
      chrome.tabs.update(e.tabId, {
        // dynamically access the service that corresponds to the defaultService
        url: data[defaultService].track.externalUrl,
      });
      // redirect to a new url
    } catch (error) {
      console.log("error found:", error);
    }
  } else {
    // if the current link is the default service do nothing
    console.log("default ", defaultService, " exists! do nothing");
  }
});

console.log("Service Worker has Loaded...");
init();
