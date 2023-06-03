import fetch from 'node-fetch'

let TOKEN
let TIME_STAMP
const EXPIRATION = 36000

/*
    This class is used to generate a token for the Spotify API. The token is
    used to authenticate the user and to get access to the Spotify API.

    Attributes:
        client_id (string): The client id of your spotify app.
        client_secret (string): The client of your spotify app.
        token (string): The token for the Spotify API.

    Returns:
        tring: The token for the Spotify API.

    Methods:
        getToken(): Returns a token for the Spotify API.

    Example:
        const token = await GenerateSpotifyToken.getToken();

    Note:
        The token is valid for 1 hour. After 1 hour the token is no longer valid
        and a new token must be generated.

        The token is stored in the TOKEN variable. The time stamp is stored in
        the TIME_STAMP variable. If the token is still valid, the token is
        returned. If the token is no longer valid, a new token is generated.
*/
class GenerateSpotifyToken {
  constructor () {
    this.client_id = process.env.SPOTIFY_CLIENT_ID
    this.client_secret = process.env.SPOTIFY_CLIENT_SECRET
  }

  async getToken () {
    const url = process.env.SPOTIFY_API_TOKEN_GENERATOR_URL
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    // Set the data
    const data = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: this.client_id,
      client_secret: this.client_secret
    })

    // Check if the token is still valid
    if (TOKEN !== null && Date.now() - TIME_STAMP < EXPIRATION) {
      return TOKEN
    }

    // Get the response
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: data
    })

    // Check if the response is valid
    if (response.status !== 200) {
      const message = await response.json()
      throw new Error(message.error.message)
    }

    // Get the token
    const json = await response.json()
    TOKEN = json.access_token
    TIME_STAMP = Date.now()

    // Return the token
    return TOKEN
  }
}

export default GenerateSpotifyToken
