import TrackDetailsExtraction from '../../../interfaces/TrackDetailsExtraction.js'
import dotenv from 'dotenv'

/**
 * A class that extracts track details from Deezer API.
 * @extends TrackDetailsExtraction
 */
class DeezerTrackDetailsExtraction extends TrackDetailsExtraction {
  /**
   * Fetches the track details from Deezer API.
   * @param {string} trackId - The ID of the track to fetch details for.
   * @returns {Object} - An object containing the track details.
   * @throws {Error} - If there is an error fetching or parsing the track details.
   */
  async getTrackDetails (trackId) {
    // Get the environment variables
    dotenv.config()

    // Set the track id
    this.trackId = trackId

    // Set the url
    const url = `${process.env.DEEZER_API_TRACK_QUERY_URL}${this.trackId}`

    // Set the response
    let response

    // Set the timeout
    const TIMEOUT = 5000

    // Fetch the track details
    try {
      response = await fetch(url, {
        timeout: TIMEOUT
      })
    } catch (error) {
      throw new Error(`Error fetching track details: ${error}`)
    }

    // Check the response
    if (!response || response.status !== 200) {
      throw new Error(`Error fetching track details: ${response.statusText}`)
    }

    // Set the response
    let responseJSON

    // Parse the response
    try {
      responseJSON = await response.json()
    } catch (error) {
      throw new Error(`Error parsing track details: ${error}`)
    }

    // check if the response is valid
    if (responseJSON.id === undefined) {
      throw new Error(`Error: ${responseJSON.error.message}`)
    }

    this.trackDetails = {
      title: responseJSON.title,
      artist: responseJSON.artist.name,
      album: responseJSON.album.title,
      externalUrl: responseJSON.link
    }

    // Return the track details
    // TODO:check forr different titles versions or son versions. ie. David Bisbal {Apiádate de Mi (Grabación en Estudio)} vs David Bisbal {Apiádate de Mi}
    // Do this for all services
    return this.trackDetails
  }
}

export default DeezerTrackDetailsExtraction
