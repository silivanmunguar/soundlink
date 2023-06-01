// Purpose: Interface for querying track details.
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
