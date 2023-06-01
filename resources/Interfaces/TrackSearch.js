/** #TODO: Improve documentation
 * @interface TrackSearch
 * @description Interface for track search
 * @method searchForTrack
 * @param {Object} incomingTrackDetials - The incoming track details
 * @returns {Object} - The new track details
 * @throws {Error} - If method not implemented
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
