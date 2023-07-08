"use strict";

// get user defualt setting from storage
chrome.storage.sync.get("userSettings", (data) => {
  const userSettings = data.userSettings;
  if (userSettings) {
    // set the rules
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: userSettings.blockedServices,
    });
  }
});

// lsiten for rule matches from the background script
chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(async (e) => {
  console.log("Rule matched: ", e.request.url);

  const apiurl = `https://soundlink-api.onrender.com/api/track?url=${e.request.url}`;
  try {
    const data = await (await fetch(apiurl)).json();

    // redirect to the track page
    chrome.tabs.update(e.tabId, {
      url: data.deezer.track.externalUrl,
    });
    // redirect to a new url
  } catch (error) {
    console.error(error);
  }
});

console.log("Service Worker has Loaded...");
