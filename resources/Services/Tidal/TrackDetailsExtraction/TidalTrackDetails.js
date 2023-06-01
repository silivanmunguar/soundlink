import QueryTrackDetails from "../../../Interfaces/TrackDetails.js";

// This class is responsible for getting the track details from Tidal API given a track id.
class TidalTrackDetails extends QueryTrackDetails {
  async getTrackDetails(trackId) {
    this.trackId = trackId;

    // Set the url
    const url = `https://api.tidal.com/v1/tracks/${this.trackId}?countryCode=US`;

    // Set the timeout
    const TIMEOUT = 5000;

    // Get the response
    const response = await fetch(url, {
      timeout: TIMEOUT,
    });

    // Check if the response is valid
    if (response.status !== 200) {
      const message = await response.json();
      throw new Error(message.error.message);
    }

    // Get the track details
    const responseJson = await response.json();

    // Set the track details
    this.trackDetails = {
      title: responseJson.title,
      artist: responseJson.artist.name,
      album: responseJson.album.title,
      externalUrl: responseJson.url,
    };

    return this.trackDetails;
  }
}

export default TidalTrackDetails;
