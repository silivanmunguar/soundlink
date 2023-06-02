import QueryTrackDetails from '../../../Interfaces/QueryTrackDetails.js'
import DeezerTrackDetailsHelper from './DeezerTrackDetailsHelper.js'

class DeezerTrackDetails extends QueryTrackDetails {
  async getTrackDetails (trackId) {
    /* TODO: Find a direct way to get track details from Deezer API
    currently you are quering the share url and then extracting the track
    url that contains the id and then using the id to quesry track details using a helper class
    */
    const helper = new DeezerTrackDetailsHelper()
    this.trackId = await helper.getTrackId(trackId)

    // Set the url
    const url = `${process.env.DEEZER_API_TRACK_QUERY_URL}${this.trackId}`

    // Set the timeout
    const TIMEOUT = 5000

    // Get the response
    const response = await fetch(url, {
      timeout: TIMEOUT
    })

    // Check if the response is valid
    if (response.status !== 200) {
      const message = await response.json()
      throw new Error(message.error.message)
    }

    // Get the track details
    const responseJSON = await response.json()

    // Set the track details
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

export default DeezerTrackDetails
