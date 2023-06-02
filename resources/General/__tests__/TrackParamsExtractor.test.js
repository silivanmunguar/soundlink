import TrackParamsExtractor from '../TrackParamsExtractor'
import { describe, test, expect } from '@jest/globals' // for the linter to stop complaining

// SPOTIFY TESTS
describe('TrackParamsExtractor', () => {
  describe('extractTrackParams', () => {
    test('For Spotify: should extract the track parameters from the shared URL', () => {
      // Arrange
      const trackParamsExtractor = new TrackParamsExtractor()
      trackParamsExtractor.sharedUrl =
        'https://open.spotify.com/track/7BH6nyhnWTSfMUwwrCYbJF?si=44f5565533da4d74'

      // Act
      const trackParams = trackParamsExtractor.extractTrackParams()

      // Assert
      expect(trackParams).toEqual({
        serviceProvider: 'spotify',
        trackId: '7BH6nyhnWTSfMUwwrCYbJF'
      })
    })

    test('For Spotify: should return null if the shared URL is not set', () => {
      // Arrange
      const trackParamsExtractor = new TrackParamsExtractor()

      // Act
      const trackParams = trackParamsExtractor.extractTrackParams()

      // Assert
      expect(trackParams).toBeNull()
    })
  })
})

// DEEZER TESTS
describe('TrackParamsExtractor', () => {
  describe('extractTrackParams', () => {
    test('For Deezer: should extract the track parameters from the shared URL', () => {
      // Arrange
      const trackParamsExtractor = new TrackParamsExtractor()
      trackParamsExtractor.sharedUrl =
        'https://www.deezer.com/track/3135556?utm_source=deezer&utm_content=track-3135556&utm_term=0_1590699905&utm_medium=web'

      // Act
      const trackParams = trackParamsExtractor.extractTrackParams()

      // Assert
      expect(trackParams).toEqual({
        serviceProvider: 'deezer',
        trackId: '3135556'
      })
    })

    test('For Deezer: should return null if the shared URL is not set', () => {
      // Arrange
      const trackParamsExtractor = new TrackParamsExtractor()

      // Act
      const trackParams = trackParamsExtractor.extractTrackParams()

      // Assert
      expect(trackParams).toBeNull()
    })
  })
})

// APPLE MUSIC TESTS
describe('TrackParamsExtractor', () => {
  describe('extractTrackParams', () => {
    test('For Apple Music: should extract the track parameters from the shared URL', () => {
      // Arrange
      const trackParamsExtractor = new TrackParamsExtractor()
      trackParamsExtractor.sharedUrl =
        'https://music.apple.com/us/album/la-gota-fr%C3%ADa/1543991915?i=1543991935'

      // Act
      const trackParams = trackParamsExtractor.extractTrackParams()

      // Assert
      expect(trackParams).toEqual({
        serviceProvider: 'apple',
        trackId: '1543991915'
      })
    })

    test('For Apple Music: should return null if the shared URL is not set', () => {
      // Arrange
      const trackParamsExtractor = new TrackParamsExtractor()

      // Act
      const trackParams = trackParamsExtractor.extractTrackParams()

      // Assert
      expect(trackParams).toBeNull()
    })
  })
})
