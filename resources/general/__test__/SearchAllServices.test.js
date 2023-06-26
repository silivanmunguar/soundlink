import SearchAllServices from '../SearchAllServices.js'
import SpotifyTokenGenerator from '../../services/Spotify/Oauth/GenerateSpotifyToken.js'
import SpotifyTrackDetails from '../../services/Spotify/TrackDetailsExtraction/SpotifyTrackDetails.js'
import SpotifyTrackSearch from '../../services/Spotify/TrackSearch/SpotifyTrackSearch.js'
import DeezerTrackDetails from '../../services/Deezer/TrackDetailsExtraction/DeezerTrackDetailsExtraction.js'
import DeezerTrackSearch from '../../services/Deezer/TrackSearch/DeezerTrackSearch.js'

import { describe, it, expect, beforeEach, jest } from '@jest/globals'

describe('Testing SearchAllServices to get song information from all services', () => {
  let searchAllServices

  beforeEach(() => {
    searchAllServices = new SearchAllServices()

    // Mock and resolve SpotifyTokenGenerator.getToken call
    jest
      .spyOn(SpotifyTokenGenerator, 'getToken')
      .mockResolvedValue('mocked_token')
  })

  describe('Testing getAllTracks', () => {
    it('should return track details from all music services', async () => {
      const spotifyResults = {
        title: 'Reckless & Sweet',
        artist: 'Amaarae',
        album: 'Reckless & Sweet',
        externalUrl: 'https://open.spotify.com/track/0YF4MF77Kw8CMkZkfDFtlj'
      }

      const deezerResults = {
        title: 'Reckless & Sweet',
        artist: 'Amaarae',
        album: 'Reckless & Sweet',
        externalUrl: 'https://www.deezer.com/track/2185137987'
      }

      // Mock and resolve SpotifyTrackDetails.getTrackDetails call
      jest
        .spyOn(SpotifyTrackDetails.prototype, 'getTrackDetails')
        .mockResolvedValue(spotifyResults)

      // Mock and resolve DeezerTrackDetails.getTrackDetails call
      jest
        .spyOn(DeezerTrackDetails.prototype, 'getTrackDetails')
        .mockResolvedValue(deezerResults)

      // Mock and resolve SpotifyTrackSearch.searchTrack call
      jest
        .spyOn(SpotifyTrackSearch.prototype, 'searchForTrack')
        .mockResolvedValue(spotifyResults)

      // Mock and resolve DeezerTrackSearch.searchTrack call
      jest
        .spyOn(DeezerTrackSearch.prototype, 'searchForTrack')
        .mockResolvedValue(deezerResults)

      const trackParams = [
        {
          serviceProvider: 'spotify',
          trackId: '0YF4MF77Kw8CMkZkfDFtlj'
        },
        {
          serviceProvider: 'deezer',
          trackId: '2185137987'
        }
      ]

      // Get track details from all services
      let allServicesResults = {}

      // check if the results from all services are returned
      for (const trackParam of trackParams) {
        allServicesResults = await searchAllServices.getAllTracks(trackParam)
      }

      expect(allServicesResults.spotify.track).toEqual(spotifyResults)
      expect(allServicesResults.deezer.track).toEqual(deezerResults)

      // Restore original implementation of SpotifyTokenGenerator.getToken
      SpotifyTokenGenerator.getToken.mockRestore()

      // Restore original implementation of SpotifyTrackDetails.getTrackDetails
      SpotifyTrackDetails.prototype.getTrackDetails.mockRestore()

      // Restore original implementation of DeezerTrackDetails.getTrackDetails
      DeezerTrackDetails.prototype.getTrackDetails.mockRestore()
    })
  })
})
