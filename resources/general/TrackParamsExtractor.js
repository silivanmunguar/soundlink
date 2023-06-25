import DeezerTrackExtractionHelper from '../services/Deezer/TrackDetailsExtraction/DeezerTrackDetailsExtractionHelper.js'

/**
 * - `TrackParamsExtractor`
 *
 * A class for extracting track parameters (service provider and track ID) from a shared track URL.
 *
 * @class
 *
 * @property {Object} _trackParams - An object containing the extracted track parameters (serviceProvider, trackId).
 * @property {String} sharedUrl - The shared track URL to extract parameters from.
 *
 * @method extractTrackParams - Extracts track parameters from a shared track URL.
 *   @param {String} sharedUrl - The shared track URL to extract parameters from.
 *   @returns {Object} - An object containing the extracted track parameters (serviceProvider, trackId).
 *
 * @example
 * // Create an instance of TrackParamsExtractor
 * const trackParamsExtractor = new TrackParamsExtractor();
 *
 * // Set the shared track URL to extract parameters from
 * trackParamsExtractor.sharedUrl = "https://open.spotify.com/track/3Zwu2K0Qa5sT6teZO0Ql3j?si=8e2e2e2e2e2e2e2e";
 *
 * // Extract track parameters from the shared track URL
 * const trackParams = trackParamsExtractor.extractTrackParams(trackParamsExtractor.sharedUrl);
 *
 * // Log the extracted track parameters to the console
 * console.log(trackParams.serviceProvider); // logs 'spotify'
 * console.log(trackParams.trackId); // logs '3Zwu2K0Qa5sT6teZO0Ql3j'
 */
class TrackParamsExtractor {
  constructor () {
    this._trackParams = {}
    this.sharedUrl = ''
  }

  async extractTrackParams (sharedUrl) {
    // Set the shared URL
    this.sharedUrl = sharedUrl
    // Get serice provider
    /** ______________________________________________________________________________
     *
     * MY SOLUTION
     * const serviceProvider = this.sharedUrl.split("/")[2].split(".")[1];
     * _________________________________________________________________________________
     *
     * COPILOT thinks this is more efficient. However, it is less readable.
     * _________________________________________________________________________________
     */

    // if sharedUrl is not defined, return null
    if (
      this.sharedUrl === undefined ||
      this.sharedUrl === null ||
      this.sharedUrl === ''
    ) {
      throw new Error('sharedUrl is not defined')
    }

    // Get the first and second dot index
    const firstDotIndex = this.sharedUrl.indexOf('.')
    const secondDotIndex = this.sharedUrl.indexOf('.', firstDotIndex + 1)

    // Get the service provider
    let serviceProvider = this.sharedUrl.substring(
      firstDotIndex + 1,
      secondDotIndex
    )

    // Get the track id
    const lastSlashIndex = this.sharedUrl.lastIndexOf('/')
    let trackId = this.sharedUrl.substring(lastSlashIndex + 1).split('?')[0]

    // adjust for deezer that has a unique share url
    /* TODO: Find a direct way to get track details from Deezer API
    currently you are quering the share url and then extracting the track
    url that contains the id and then using the id to quesry track details using a helper class
    */
    if (serviceProvider === 'page') {
      serviceProvider = 'deezer'
      trackId = await new DeezerTrackExtractionHelper().getTrackId(trackId)
    }

    // Set the track params
    this._trackParams = {
      serviceProvider,
      trackId
    }

    // Return the track params
    return this._trackParams
  }
}

export default TrackParamsExtractor
