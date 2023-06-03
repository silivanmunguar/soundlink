import TrackDetailsExtraction from '../../../Interfaces/TrackDetailsExtraction.js'
import DeezerTrackDetailsExtractionHelper from './DeezerTrackDetailsExtractionHelper.js'

class DeezerTrackDetailsExtraction extends TrackDetailsExtraction {
  async getTrackDetails (trackId) {
    /* TODO: Find a direct way to get track details from Deezer API
    currently you are quering the share url and then extracting the track
    url that contains the id and then using the id to quesry track details using a helper class
    */
    // Get the track id
    this.trackId = await new DeezerTrackDetailsExtractionHelper().getTrackId(
      trackId
    )

    // Set the url
    const url = `${process.env.DEEZER_API_TRACK_QUERY_URL}${this.trackId}`

    // Set the response
    let response

    // Set the timeout
    // const TIMEOUT = 5000

    // Fetch the track details
    try {
      response = await fetch(url, {
        // timeout: TIMEOUT
      })
    } catch (error) {
      console.error(`Error fetching track details: ${error}`)
      return null
    }

    // Check the response
    if (!response || response.status !== 200) {
      console.error(`Error fetching track details: ${response.statusText}`)
      return null
    }

    // Set the response
    let responseJSON

    // Parse the response
    try {
      responseJSON = await response.json()
    } catch (error) {
      console.error(`Error parsing track details: ${error}`)
      return null
    }

    // check if the response is valid
    if (responseJSON.id === undefined) {
      console.log('Error:', responseJSON.error.message)
      return null
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

