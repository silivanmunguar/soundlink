class DeezerTrackDetailsHelper {
  constructor () {
    this._trackId = null
  }

  async getTrackId (trackId) {
    // Get the string at the end of the shared url that.
    const tempTrackId = trackId

    // Set the raw track url.
    const rawTrackUrl = `${process.env.DEEZER_SHARED_TRACK_URL}${tempTrackId}`

    // Load the raw track url to get the track url that contains the track id.
    const response = await fetch(rawTrackUrl).catch((error) =>
      console.error(error)
    )

    // Get the track url that contains the track id.
    const url = response.url

    // Get the track id from the track url.
    this._trackId = url.split('/')[5].split('?')[0]

    return this._trackId
  }
}

export default DeezerTrackDetailsHelper
