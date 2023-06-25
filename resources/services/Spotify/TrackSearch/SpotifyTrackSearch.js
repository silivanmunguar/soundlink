import TrackSearch from '../../../interfaces/TrackSearch.js'
import GenerateSpotifyToken from '../Oauth/GenerateSpotifyToken.js'
import dotenv from 'dotenv'

class SpotifyTrackSearch extends TrackSearch {
  async searchForTrack (incomingTrackDetails) {
    // Get the environment variables
    dotenv.config()

    // Set the incoming track details
    this.incomingTrackDetails = incomingTrackDetails

    // Set suffix params
    const surfixParams = '&type=track&limit=1'

    // Set the search url
    this.searchUrl = `${process.env.SPOTIFY_SEARCH_URL}${this.incomingTrackDetails.artist}+${this.incomingTrackDetails.title}${surfixParams}`

    // Get the token
    const tokenGenerator = new GenerateSpotifyToken()
    this.token = await tokenGenerator.getToken()

    // Set the headers
    const headers = {
      Authorization: `Bearer ${this.token}`
    }

    // Set the timeout
    const TIMEOUT = 5000

    // Get the response
    let response
    try {
      response = await fetch(this.searchUrl, {
        headers,
        timeout: TIMEOUT
      })
    } catch (error) {
      console.log('Error getting track: ', error)
    }

    // Check if the response is valid
    if (response.status !== 200) {
      const message = await response.json()
      throw new Error(
        'searching for track with given trackDetails: ' + response.status
      )
    }

    // Get the track details
    response = await response.json()

    // Get the track details
    this.newTrackDetails.id = response.tracks.items[0].id
    this.newTrackDetails.title = response.tracks.items[0].name
    this.newTrackDetails.artist = response.tracks.items[0].artists[0].name
    this.newTrackDetails.album = response.tracks.items[0].album.name
    this.newTrackDetails.externalUrl =
      response.tracks.items[0].external_urls.spotify

    return this.newTrackDetails
  }
}

export default SpotifyTrackSearch
