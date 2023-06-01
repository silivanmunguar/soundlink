// Purpose: Interface for track search classes.
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
