import SearchAllServices from '../SearchAllServices.js'
import { describe, it, expect, beforeEach } from '@jest/globals'

describe('SearchAllServices', () => {
  let searchAllServices

  beforeEach(() => {
    searchAllServices = new SearchAllServices()
  })

  describe('Testing getAllTracks', () => {
    it('should return track details from Spotify', async () => {
      const trackParams = {
        serviceProvider: 'spotify',
        trackId: '123'
      }

      const results = await searchAllServices.getAllTracks(trackParams)

      expect(results.spotify.track).toBeDefined()
      expect(results.deezer.track).not.toBeDefined()
    })

    it('should return track details from Deezer', async () => {
      const trackParams = {
        serviceProvider: 'deezer',
        trackId: '123'
      }

      const results = await searchAllServices.getAllTracks(trackParams)

      expect(results.deezer.track).toBeDefined()
      expect(results.spotify.track).not.toBeDefined()
    })

    it('should return track details from both Spotify and Deezer', async () => {
      const trackParams = {
        serviceProvider: 'spotify',
        trackId: '123'
      }

      const results = await searchAllServices.getAllTracks(trackParams)

      expect(results.spotify.track).toBeDefined()
      expect(results.deezer.track).toBeDefined()
    })
  })
})
