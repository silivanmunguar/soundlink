import TrackParamsExtractor from '../TrackParamsExtractor.js'
import { describe, it, expect } from '@jest/globals' // for the linter to stop complaining

// SPOTIFY TESTS
describe('Testing TrackParamsExtractor to extract serviceProvider and trackId from a shared url', () => {
  describe('SPOTIFY', () => {
    it('should extract the track id and service provider from the shared URL', async () => {
      // Arrange
      const trackParamsExtractor = new TrackParamsExtractor()
      const sharedUrl =
        'https://open.spotify.com/track/7BH6nyhnWTSfMUwwrCYbJF?si=44f5565533da4d74'

      // Act
      const trackParams = await trackParamsExtractor.extractTrackParams(
        sharedUrl
      )

      // Assert
      expect(trackParams).toEqual({
        serviceProvider: 'spotify',
        trackId: '7BH6nyhnWTSfMUwwrCYbJF'
      })
    })

    it('should throw an error if shared url if not defined', async () => {
      // Arrange
      const trackParamsExtractor = new TrackParamsExtractor()

      await expect(trackParamsExtractor.extractTrackParams()).rejects.toThrow()
    })
  })

  // DEEZER TESTS
  describe('DEEZER', () => {
    it('should extract the track id and service provider from the shared URL', async () => {
      // Arrange
      const trackParamsExtractor = new TrackParamsExtractor()
      const sharedUrl = 'https://deezer.page.link/JbTJe9mtGEdh3tqT9'

      // Act
      const trackParams = await trackParamsExtractor.extractTrackParams(
        sharedUrl
      )

      // Assert
      expect(trackParams).toEqual({
        serviceProvider: 'deezer',
        trackId: '2185137987'
      })
    })

    it('should throw an error if shared url if not defined', async () => {
      // Arrange
      const trackParamsExtractor = new TrackParamsExtractor()

      await expect(trackParamsExtractor.extractTrackParams()).rejects.toThrow()
    })
  })

  // APPLE MUSIC TESTS
  describe('APPLE MUSIC', () => {
    it('should extract the track id and service provider from the shared URL', async () => {
      // Arrange
      const trackParamsExtractor = new TrackParamsExtractor()
      const sharedUrl =
        'https://music.apple.com/us/album/la-gota-fr%C3%ADa/1543991915?i=1543991935'

      // Act
      const trackParams = await trackParamsExtractor.extractTrackParams(
        sharedUrl
      )

      // Assert
      expect(trackParams).toEqual({
        serviceProvider: 'apple',
        trackId: '1543991915'
      })
    })

    it('should throw an error if shared url if not defined', async () => {
      // Arrange
      const trackParamsExtractor = new TrackParamsExtractor()

      await expect(trackParamsExtractor.extractTrackParams()).rejects.toThrow()
    })
  })
})
