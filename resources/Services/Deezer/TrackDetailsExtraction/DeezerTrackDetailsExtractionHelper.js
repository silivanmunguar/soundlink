class DeezerTrackDetailsExtractionHelper {
  constructor() {
    this._trackId = null
  }

  async getTrackId(trackId) {
    // Get the string at the end of the shared url that.
    const tempTrackId = trackId

    // Set the raw track url.
    // Because the shared url does no have  avalid track id, we cna use to query the API.
    // We need load the as a user would if they opend and that redirects to a url with a valid track id.
    // We can then extract the track id from the url and use it to query the API.
    const rawTrackUrl = `${process.env.DEEZER_SHARED_TRACK_URL}${tempTrackId}`

    // Load the raw track url to get the track url that contains the track id.
    const response = await fetch(rawTrackUrl).catch((error) =>
      console.error(error)
    )

    // Get the track url that contains the track id.
    const url = response.url

    // Get the track id from the track url.
    const lastSlashIndex = url.lastIndexOf('/')
    this._trackId = url.substring(lastSlashIndex + 1).split('?')[0]

    // console.log('Helper-trackId :', this._trackId)

    return this._trackId
  }
}

export default DeezerTrackDetailsExtractionHelper
