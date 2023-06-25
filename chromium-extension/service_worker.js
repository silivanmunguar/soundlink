'use strict'
import TrackParamsExtractor from '../resources/general/TrackParamsExtractor.js'
import SearchAllServices from '../resources/general/SearchAllServices.js'

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
  const msg = `Navigation to ${e.request.url} redirected on tab ${e.request.tabId}.`
  console.log(msg)
  chrome.tabs.update(e.request.tabId, {
    url: chrome.runtime.getURL('/homepage/index.html'),
  })
})

// import TrackParamsExtractor from '../resources/general/TrackParamsExtractor.js'
// import SearchAllServices from '../resources/general/SearchAllServices.js'

// Select all the buttons
// const buttons = document.querySelectorAll('button')

// Select the thumbnail
// const thunmbnail = document.getElementById('thumbnail-scr')

//shared url
const sharedUrl = 'https://deezer.page.link/JbTJe9mtGEdh3tqT9'

// Extract track params from URL
const trackParams = await new TrackParamsExtractor().extractTrackParams(
  sharedUrl,
)
// const trackParams = { serviceProvider: 'deezer', trackId: '2185137987' }

// Search for track on all services
// const resultsFromAllServices = await new SearchAllServices().getAllTracks(
//   trackParams,
// )

// mock results from all services
const resultsFromAllServices = {
  spotify: {
    track: {
      id: '0YF4MF77Kw8CMkZkfDFtlj',
      title: 'Reckless & Sweet',
      artist: 'Amaarae',
      album: 'Reckless & Sweet',
      externalUrl: 'https://open.spotify.com/track/0YF4MF77Kw8CMkZkfDFtlj',
    },
  },
  deezer: {
    track: {
      title: 'Reckless & Sweet',
      artist: 'Amaarae',
      album: 'Reckless & Sweet',
      externalUrl: 'https://www.deezer.com/track/2185137987',
    },
  },
}

// set thumbnail src
if (trackParams.serviceProvider === 'deezer') {
  let deezerThumnail = `https://widget.deezer.com/widget/dark/track/${trackParams.trackId}`
  console.log('deezer thumbnail: ', deezerThumnail)
}

// Loop through the buttons
// buttons.forEach((button) => {
//   // Get the service name from the data-service attribute
//   const serviceProvider = button.dataset.service

//   // Get the external URL from resultsFromAllServices
//   const externalUrl = resultsFromAllServices[serviceProvider].track.externalUrl

//   // Assign the external URL to the button
//   button.addEventListener('click', () => {
//     console.log('External URL: ', externalUrl)
//     // window.open(externalUrl, '_blank')
//   })
// })

// const thumbnailsrc = thunmbnail.getAttribute('src')

console.log('Track Params: ', trackParams)
console.log('Results From All Services: ', resultsFromAllServices)
// console.log(thumbnailsrc)

console.log('Service Worker Loaded...')
