import dotenv from 'dotenv'

/*
    This class is used to generate a token for the Spotify API. The token is
    used to authenticate the user and to get access to the Spotify API.

    It is a singleton class. This means that only one instance of this class
    can be created. This is done to prevent multiple tokens from being
    generated. It is using a static instance of the proper to store the
    singleton instance. In the constructor the instance is checked. If the
    instance is already set, the instance is returned. If the instance is not
    set, the instance is set to this instance.

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
  constructor() {
    if (GenerateSpotifyToken.instance) {
      return GenerateSpotifyToken.instance
    }

    GenerateSpotifyToken.instance = this

    this.client_id = process.env.SPOTIFY_CLIENT_ID
    this.client_secret = process.env.SPOTIFY_CLIENT_SECRET

    this.TOKEN = null
    this.TIME_STAMP = null
    this.EXPIRATION = 3600000 // 1 hour

    // Get the environment variables
    dotenv.config()
  }

  async getToken() {
    // Check if the token is still valid
    if (this.TOKEN && Date.now() - this.TIME_STAMP < this.EXPIRATION) {
      return this.TOKEN
    }

    // Set the url
    const url = process.env.SPOTIFY_API_TOKEN_GENERATOR_URL

    console.log(this.client_id)
    console.log(this.client_secret)

    // Get the response
    const response = await global.fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.client_id,
        client_secret: this.client_secret,
      }),
    })

    const data = await response.json()

    if (response.status !== 200) {
      const errorMessage = data.error
      // ? data.error.message
      // : 'Failed to get access token'
      throw new Error(errorMessage)
    }

    // Get the token and set the time stamp
    this.TOKEN = data.access_token
    this.TIME_STAMP = Date.now()

    console.log('Spotify token: ', this.TOKEN)
    // Return the token
    return this.TOKEN
  }
}

// const SpotifyTokenGenerator = new GenerateSpotifyToken()

// export default SpotifyTokenGenerator
export default GenerateSpotifyToken
