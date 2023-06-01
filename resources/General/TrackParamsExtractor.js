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
    this._trackParams = {};
    this.sharedUrl = "";
  }

  extractTrackParams(sharedUrl) {
    // Get serice provider
    const serviceProvider = sharedUrl.split("/")[2].split(".")[1];

    // Get the track id
    const trackId = sharedUrl.split("/")[4].split("?")[0];

    // Set the track params
    this._trackParams = {
      serviceProvider: serviceProvider,
      trackId: trackId,
    };

    // Return the track params
    return this._trackParams;
  }
}

export default TrackParamsExtractor;
