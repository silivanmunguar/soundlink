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
  constructor() {
    this._trackParams = {}
    this.sharedUrl = ''
  }

  extractTrackParams() {
    // Return null if the shared URL is not set
    if (!this.sharedUrl) {
      return null
    }

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

    const firstDotIndex = this.sharedUrl.indexOf('.')
    const secondDotIndex = this.sharedUrl.indexOf('.', firstDotIndex + 1)

    // Get the service provider
    let serviceProvider = this.sharedUrl.substring(
      firstDotIndex + 1,
      secondDotIndex,
    )

    // adjust for deezer that has a unique share url
    if (serviceProvider === 'page') {
      serviceProvider = 'deezer'
    }

    // Get the track id
    const lastSlashIndex = this.sharedUrl.lastIndexOf('/')
    const trackId = this.sharedUrl.substring(lastSlashIndex + 1).split('?')[0]

    // Set the track params
    this._trackParams = {
      serviceProvider,
      trackId,
    }

    // Return the track params
    return this._trackParams
  }
}

export default TrackParamsExtractor
