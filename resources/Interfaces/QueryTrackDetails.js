/**
 * - `QueryTrackDetails`
 *
 * An interface for querying track details.
 *
 * @class
 *
 * @property {Object} trackDetails - An object containing the details of the queried track.
 * @property {String} trackId - The ID of the track to query.
 * @property {String} token - The authentication token to use for the query.
 *
 * @method getTrackDetails - Queries the details of a track.
 *   @param {String} trackId - The ID of the track to query.
 *   @returns {Promise<Object>} - A promise that resolves with an object containing the details of the queried track.
 *
 * @example
 * // Create an instance of QueryTrackDetails
 * const queryTrackDetails = new QueryTrackDetails();
 *
 * // Set the track ID and authentication token
 * queryTrackDetails.trackId = "3Zwu2K0Qa5sT6teZO0Ql3j";
 * queryTrackDetails.token = "my-auth-token";
 *
 * // Query the details of the track
 * queryTrackDetails.getTrackDetails().then((trackDetails) => {
 *   console.log(trackDetails);
 * });
 */
class QueryTrackDetails {
  constructor() {
    this.trackDetails = {};
    this.trackId = "";
    this.token = "";
  }

  getTrackDetails(trackId) {
    throw new Error("Method 'getTrackDetails' must be implemented.");
  }
}

export default QueryTrackDetails;
