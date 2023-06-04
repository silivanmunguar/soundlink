import DeezerTrackDetailsExtractionHelper from '../TrackDetailsExtraction/DeezerTrackDetailsExtractionHelper.js'
import DeezerTrackDetailsExtraction from '../TrackDetailsExtraction/DeezerTrackDetailsExtraction.js'
import {
  jest,
  describe,
  beforeEach,
  afterEach,
  it,
  expect
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
    const trackId = 'v7LvtVo1wQq7tJnK6'
    const expectedTrackId = '576754312'
    const expectedTrackDetails = {
      title: 'Baby (feat. MARINA & Luis Fonsi)',
      artist: 'Clean Bandit',
      album: 'Baby (feat. MARINA & Luis Fonsi)',
      externalUrl: 'https://www.deezer.com/track/576754312'
    }

    // Mock the getTrackId method of DeezerTrackDetailsExtractionHelper
    const getTrackIdMock = jest.spyOn(
      DeezerTrackDetailsExtractionHelper.prototype,
      'getTrackId'
    )
    getTrackIdMock.mockImplementation(() => Promise.resolve(expectedTrackId))

    const trackDetails = await deezerTrackDetailsExtraction.getTrackDetails(
      trackId
    )

    expect(trackDetails).toEqual(expectedTrackDetails)
    expect(getTrackIdMock).toHaveBeenCalledWith(trackId)
  })

  it('should throw an error for an invalid input', async () => {
    const trackId = 'SDSDS'

    // Mock the getTrackId method of DeezerTrackDetailsExtractionHelper
    const getTrackIdMock = jest.spyOn(
      DeezerTrackDetailsExtractionHelper.prototype,
      'getTrackId'
    )

    // Mock the getTrackId method throwing an error
    getTrackIdMock.mockImplementation(() => {
      throw new Error('An error occurred')
    })

    await expect(
      deezerTrackDetailsExtraction.getTrackDetails(trackId)
    ).rejects.toThrow()

    expect(getTrackIdMock).toHaveBeenCalledWith(trackId)
  })
  // it('should throw an error for an invalid trackId', async () => {
  //   const trackId = 'invalidTrackId'

  //   // Mock the getTrackId method of DeezerTrackDetailsExtractionHelper
  //   const getTrackIdMock = jest.spyOn(
  //     DeezerTrackDetailsExtractionHelper.prototype,
  //     'getTrackId'
  //   )

  //   // Mock the getTrackId method throwing an error
  //   getTrackIdMock.mockImplementation(() => {
  //     throw new Error('An error occurred')
  //   })

  //   const trackDetails = await deezerTrackDetailsExtraction.getTrackDetails(
  //     trackId
  //   )

  //   expect(trackDetails).toBeNull()
  //   expect(getTrackIdMock).toHaveBeenCalledWith(trackId)
  // })
})

describe('Testing DeezerTrackDetailsExtractionHelper', () => {
  let deezerTrackDetailsExtractionHelper

  beforeEach(() => {
    deezerTrackDetailsExtractionHelper =
      new DeezerTrackDetailsExtractionHelper()
  })

  it('should extract the track ID from a shared track URL', async () => {
    const sharedTrackId = 'v7LvtVo1wQq7tJnK6'
    const expectedTrackId = '576754312'

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
