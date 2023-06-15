// chrome.webRequest.onBeforeRequest.addListener(
//   function (details) {
//     if (details.url.startsWith === 'https://open.spotify.com/') {
//       chrome.tabs.create({ url: chrome.extension.getURL('src/index.html') })
//     }
//   },
//   { urls: ['<all_urls>'] },
//   ['blocking'],
// )
chrome.tabs.onCreated.addListener(function (tab) {
  console.log(tab.url)
  const musicServices = /(https?:\/\/(spotify|music\.apple|deezer|tidal)\.com)/i
  if (musicServices.test(tab.url)) {
    console.log('music service', tab.url)
  }
})
