/*  

  This is to extract track parameters from a shared url. 
  The shared url is the url that is shared by the user from the service provider they are using.

  Attributes:
    _trackParams: Object (serviceProvider, trackId)
    serviceProvider: String (deezer, spotify, etc.)
    trackId: String (the id of the track)
    sharedUrl: String (the url that is shared by the user)

  Methods:
    get trackParams(): Object (serviceProvider, trackId)
    extractTrackParams(sharedUrl: String): void 

  Return:
    None
  
  Example:
    const trackParamsExtractor = new TrackParamsExtractor();
    trackParamsExtractor.extractTrackParams(
      "https://open.spotify.com/track/3Zwu2K0Qa5sT6teZO0Ql3j?si=8e2e2e2e2e2e2e2e"
    console.log(trackParamsExtractor.trackParams.trackId);
    console.log(trackParamsExtractor.trackParams.serviceProvider); 

*/

class TrackParamsExtractor {
  constructor() {
    this._trackParams = {};
    this.sharedUrl = "";
  }

  // Getters method for trackParams
  get trackParams() {
    return this._trackParams;
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
  }
}

export default TrackParamsExtractor;
