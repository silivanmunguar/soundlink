import DeezerTrackDetailsExtractionHelper from '../TrackDetailsExtraction/DeezerTrackDetailsExtractionHelper.js'
import DeezerTrackDetailsExtraction from '../TrackDetailsExtraction/DeezerTrackDetailsExtraction.js'
import {
  jest,
  describe,
  beforeEach,
  afterEach,
  it,
  expect,
} from '@jest/globals'

describe('Testing DeezerTrackDetailsExtraction', () => {
  let deezerTrackDetailsExtraction

  beforeEach(() => {
    deezerTrackDetailsExtraction = new DeezerTrackDetailsExtraction()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should return track details for a valid track ID', async () => {
    const trackId = '576754312'
    const expectedTrackDetails = {
      title: 'Baby (feat. MARINA & Luis Fonsi)',
      artist: 'Clean Bandit',
      album: 'Baby (feat. MARINA & Luis Fonsi)',
      externalUrl: 'https://www.deezer.com/track/576754312',
    }

    // Try to get the track details
    const trackDetails = await deezerTrackDetailsExtraction.getTrackDetails(
      trackId,
    )

    expect(trackDetails).toEqual(expectedTrackDetails)
  })

  it('should throw an error for an invalid input', async () => {
    const trackId = 'invalid'

    // Try to get the track details
    await expect(
      deezerTrackDetailsExtraction.getTrackDetails(trackId),
    ).rejects.toThrow()
  })
})

describe('Testing DeezerTrackDetailsExtractionHelper', () => {
  let deezerTrackDetailsExtractionHelper

  beforeEach(() => {
    deezerTrackDetailsExtractionHelper =
      new DeezerTrackDetailsExtractionHelper()
  })

  it('should extract the numeric track ID from a shared track URL', async () => {
    const sharedTrackId = 'v7LvtVo1wQq7tJnK6'
    const expectedTrackId = '576754312'

    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        url: `https://www.deezer.com/us/track/${expectedTrackId}`,
      }),
    )

    const trackId = await deezerTrackDetailsExtractionHelper.getTrackId(
      sharedTrackId,
    )

    expect(trackId).toEqual(expectedTrackId)
  })
})
