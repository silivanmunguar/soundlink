/**
 * - `TrackSearch`
 *
 * An interface class for searching for track details.
 *
 * @class
 *
 * @property {Object} incomingTrackDetails - An object containing the details of the incoming track.
 * @property {Object} newTrackDetails - An object containing the details of the new track.
 * @property {String} searchUrl - The URL to use for searching for track details.
 *
 * @method searchForTrack - Searches for details of a track.
 *   @param {Object} incomingTrackDetails - An object containing the details of the incoming track.
 *   @returns {Promise<Object>} - A promise that resolves with an object containing the details of the new track.
 *
 * @example
 * // Create an instance of TrackSearch
 * const trackSearch = new TrackSearch();
 *
 * // Set the incoming track details
 * trackSearch.incomingTrackDetails = {
 *   serviceProvider: "spotify",
 *   trackId: "3Zwu2K0Qa5sT6teZO0Ql3j"
 * };
 *
 * // Search for details of the new track
 * trackSearch.searchForTrack(trackSearch.incomingTrackDetails).then((newTrackDetails) => {
 *   console.log(newTrackDetails);
 * });
 */
class TrackSearch {
  constructor() {
    this.incomingTrackDetials = {};
    this.newTrackDetails = {};
    this.searchUrl = "";
  }

  searchForTrack(incomingTrackDetials) {
    throw new Error("Method 'getTrackDetails' must be implemented.");
  }
}

export default TrackSearch;
