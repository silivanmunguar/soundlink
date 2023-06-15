import SpotifyTokenGenerator from '../Oauth/GenerateSpotifyToken.js'
import {
  describe,
  expect,
  it,
  beforeEach,
  afterEach,
  jest
} from '@jest/globals'

describe('Testing GenerateSpotifyToken to get an API access token', () => {
  describe('Testing getToken', () => {
    it('should throw an error if the API returns an error', async () => {
      jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
          status: 400,
          json: () => Promise.resolve({ error: 'invalid_client' })
        })
      )
      // Mock the fetch function to return an error response)
      await expect(SpotifyTokenGenerator.getToken()).rejects.toThrow(
        'invalid_client'
      )
    })
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ access_token: 'mockToken' })
        })
      )
    })

    afterEach(() => {
      global.fetch.mockRestore()
    })

    it('should generate a new token', async () => {
      const token = await SpotifyTokenGenerator.getToken()
      expect(token).toEqual('mockToken')
    })

    it('should return the same token if it is still valid', async () => {
      const token1 = await SpotifyTokenGenerator.getToken()
      const token2 = await SpotifyTokenGenerator.getToken()
      expect(token1).toEqual(token2)
    })

    // #TODO: Find a way to test this
    // it('should generate a new token if the old one is expired', async () => {
    //   const token1 = await SpotifyTokenGenerator.getToken()
    //   const TIMEOUT = 36000
    //   // Wait for the token to expire
    //   await new Promise((resolve) => setTimeout(resolve), TIMEOUT)
    //   const token2 = await SpotifyTokenGenerator.getToken()
    //   expect(token1).not.toEqual(token2)
    // })
  })
})
