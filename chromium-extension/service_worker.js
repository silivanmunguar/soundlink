"use strict";

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
  const msg = `Navigation to ${e.request.url} redirected to ${e.request.tabId}.`;
  console.log(msg);

  const blockedUrl = encodeURIComponent(e.request.url);
  const redirectUrl = `http://localhost:3000/?blockedUrl=${blockedUrl}`;

  // Redirect to sounlnk
  chrome.tabs.update(e.request.tabId, {
    url: redirectUrl,
  });
});

console.log("Service Worker has Loaded...");
