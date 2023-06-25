import TrackSearch from '../../../interfaces/TrackSearch.js'
import dotenv from 'dotenv'

class DeezerTrackSearch extends TrackSearch {
  async searchForTrack (incomingTrackDetails) {
    // Set environment variables
    dotenv.config()

    // Set the track details
    this.incomingTrackDetails = incomingTrackDetails
    this.searchUrl = `${process.env.DEEZER_SEARCH_URL}artist:"${this.incomingTrackDetails.artist}" track:"${this.incomingTrackDetails.title}"`

    // Set the timeout
    const TIMEOUT = 5000

    // Get the response
    const response = await fetch(this.searchUrl, {
      timeout: TIMEOUT
    })

    // Check if the response is valid
    if (response.status !== 200) {
      const message = await response.json()
      throw new Error(message.error.message)
    }

    // Get the track details
    const responseJSON = await response.json()

    // TODO: check if results are not undefined for all services
    // check if results are not undefined
    if (
      responseJSON.data.length === 0 ||
      responseJSON.data[0].title === "'Undefined" ||
      responseJSON.data[0].artist.name === 'UNDEFINED'
    ) {
      throw new Error('No results found on Deezer. Try another song.')
    }

    // set the track details
    this.newTrackDetails.title = responseJSON.data[0].title
    this.newTrackDetails.artist = responseJSON.data[0].artist.name
    this.newTrackDetails.album = responseJSON.data[0].album.title
    this.newTrackDetails.externalUrl = responseJSON.data[0].link

    return this.newTrackDetails
  }
}

export default DeezerTrackSearch
