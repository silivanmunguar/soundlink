import DeezerTrackDetailsExtractionHelper from '../TrackDetailsExtraction/DeezerTrackDetailsExtractionHelper.js'
// import DeezerTrackDetailsExtraction from '../TrackDetailsExtraction/DeezerTrackDetailsExtraction.js'
import { jest, describe, beforeEach, it, expect } from '@jest/globals'

describe('Testing DeezerTrackDetailsExtractionHelper', () => {
  let deezerTrackDetailsExtractionHelper

  beforeEach(() => {
    deezerTrackDetailsExtractionHelper =
      new DeezerTrackDetailsExtractionHelper()
  })

  it('should extract the track ID from a shared track URL', async () => {
    const sharedTrackId = 'JbTJe9mtGEdh3tqT9'
    const expectedTrackId = '2185137986'

    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        url: `https://www.deezer.com/us/track/${expectedTrackId}`
      })
    )

    const trackId = await deezerTrackDetailsExtractionHelper.getTrackId(
      sharedTrackId
    )

    expect(trackId).toEqual(expectedTrackId)
  })
})

// describe('Testing DeezerTrackDetailsExtraction', () => {
//   let deezerTrackDetailsExtraction

//   beforeEach(() => {
//     deezerTrackDetailsExtraction = new DeezerTrackDetailsExtraction()
//   })

//   it('should return track details for a valid track ID', async () => {
//     const trackId = '12345'
//     const expectedTrackDetails = {
//       title: 'Track Title',
//       artist: 'Artist Name',
//       album: 'Album Title',
//       externalUrl: 'https://www.deezer.com/track/12345'
//     }

//     // Mock the fetch function
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         status: 200,
//         json: () =>
//           Promise.resolve({
//             title: expectedTrackDetails.title,
//             artist: { name: expectedTrackDetails.artist },
//             album: { title: expectedTrackDetails.album },
//             link: expectedTrackDetails.externalUrl
//           })
//       })
//     )

//     const trackDetails = await deezerTrackDetailsExtraction.getTrackDetails(
//       trackId
//     )

//     expect(trackDetails).toEqual(expectedTrackDetails)
//   })

//   it('should throw an error for an invalid track ID', async () => {
//     const trackId = 'invalid'
//     const expectedErrorMessage = 'Invalid track ID'

//     // Mock the fetch function
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         status: 400,
//         json: () =>
//           Promise.resolve({
//             error: {
//               message: expectedErrorMessage
//             }
//           })
//       })
//     )

//     await expect(
//       deezerTrackDetailsExtraction.getTrackDetails(trackId)
//     ).rejects.toThrow(expectedErrorMessage)
//   })
// })
