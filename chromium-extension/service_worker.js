'use strict'

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
  const msg = `Navigation to ${e.request.url} redirected on tab ${e.request.tabId}.`
  console.log(msg)
  chrome.tabs.update(e.request.tabId, {
    url: chrome.runtime.getURL('/homepage/index.html'),
  })
})

console.log('Service worker started.')
