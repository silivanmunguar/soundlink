import TrackDetailsExtraction from '../../../interfaces/TrackDetailsExtraction.js'
import SpotifyTokenGenerator from '../Oauth/GenerateSpotifyToken.js'
import dotenv from 'dotenv'

/**
 * This class is responsible for getting the track details from Spotify API given a track id.

  Attributes:
      trackDetails (object): The track details.
      trackId (string): The track id.
      token (string): The token.

  Returns:
      object: The track details.

  Methods:
      getTrackDetails(trackId): Gets the track details from Spotify API given a track id.

  @example:
      const spotifyTrack = new SpotifyTrackDetails();
      spotifyTrack
        .getTrackDetails("7BH6nyhnWTSfMUwwrCYbJF")
        .then((details) => {
          console.log(details);
        })
        .catch((error) => {
          console.error(error);
        });
*/
class SpotifyTrackDetails extends TrackDetailsExtraction {
  async getTrackDetails(trackId) {
    // Get the environment variables
    dotenv.config()

    // Set the track id
    this.trackId = trackId

    // Get the token
    this.token = await SpotifyTokenGenerator.getToken()

    // Set the url
    const url = `${process.env.SPOTIFY_API_TRACK_QUERY_URL}${this.trackId}`

    // Set the headers
    const headers = {
      Authorization: `Bearer ${this.token}`
    }

    // Set the timeout
    const TIMEOUT = 5000

    // Get the response
    const response = await fetch(url, {
      headers,
      timeout: TIMEOUT
    })

    // Check if the response is valid
    if (response.status !== 200) {
      const message = await response.json()
      throw new Error(message.error.message)
    }

    // Get the track details
    const details = await response.json()
    this.trackDetails.id = details.id
    this.trackDetails.title = details.name
    this.trackDetails.artist = details.artists[0].name
    this.trackDetails.album = details.album.name
    this.trackDetails.externalUrl = details.external_urls.spotify
    return this.trackDetails
  }
}

export default SpotifyTrackDetails
