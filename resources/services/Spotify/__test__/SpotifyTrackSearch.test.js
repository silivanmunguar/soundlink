import SpotifyTrackSearch from '../TrackSearch/SpotifyTrackSearch.js'
import { describe, it, beforeEach, jest, expect } from '@jest/globals'
import SpotifyTokenGenerator from '../Oauth/GenerateSpotifyToken.js'

describe('Testing SpotifyTrackSearch to search for songs', () => {
  let spotifyTrackSearch

  beforeEach(() => {
    spotifyTrackSearch = new SpotifyTrackSearch()
  })

  describe('searchForTrack', () => {
    it('should return the details of the found track', async () => {
      const incomingTrackDetails = {
        artist: 'The Beatles',
        title: 'Hey Jude'
      }

      const expectedTrackDetails = {
        id: '12345',
        title: 'Hey Jude',
        artist: 'The Beatles',
        album: 'The White Album',
        externalUrl: 'https://open.spotify.com/track/12345'
      }

      jest.spyOn(SpotifyTokenGenerator, 'getToken').mockResolvedValue('token')
      jest.spyOn(global, 'fetch').mockResolvedValue({
        status: 200,
        json: jest.fn().mockResolvedValue({
          tracks: {
            items: [
              {
                id: '12345',
                name: 'Hey Jude',
                artists: [{ name: 'The Beatles' }],
                album: { name: 'The White Album' },
                external_urls: {
                  spotify: 'https://open.spotify.com/track/12345'
                }
              }
            ]
          }
        })
      })

      const result = await spotifyTrackSearch.searchForTrack(
        incomingTrackDetails
      )

      expect(result).toEqual(expectedTrackDetails)

      SpotifyTokenGenerator.getToken.mockRestore()
    })

    it('should throw an error if the search fails', async () => {
      const incomingTrackDetails = {
        artist: 'The Beatles',
        title: 'Hey Jude'
      }

      jest.spyOn(SpotifyTokenGenerator, 'getToken').mockResolvedValue('token')
      jest.spyOn(global, 'fetch').mockResolvedValue({
        status: 401,
        json: jest.fn().mockResolvedValue({
          status: 'Unauthorized'
        })
      })

      await expect(
        spotifyTrackSearch.searchForTrack(incomingTrackDetails)
      ).rejects.toThrow()
    })
  })
})
