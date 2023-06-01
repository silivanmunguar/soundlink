import TrackSearch from "../../../Interfaces/TrackSearch.js";

class DeezerTrackSearch extends TrackSearch {
  async searchForTrack(incomingTrackDetails) {
    this.incomingTrackDetails = incomingTrackDetails;
    this.searchUrl = `${process.env.DEEZER_SEARCH_URL}artist:"${this.incomingTrackDetails.artist}" track:"${this.incomingTrackDetails.title}"`;

    // Set the timeout
    const TIMEOUT = 5000;

    // Get the response
    const response = await fetch(this.searchUrl, {
      timeout: TIMEOUT,
    });

    // Check if the response is valid
    if (response.status !== 200) {
      const message = await response.json();
      throw new Error(message.error.message);
    }

    // Get the track details
    const responseJson = await response.json();

    //TODO: check if results are not undefined for all services
    // check if results are not undefined
    if (
      responseJson.data.length === 0 ||
      responseJson.data[0].title === "'Undefined" ||
      responseJson.data[0].artist.name === "UNDEFINED"
    ) {
      throw new Error("No results found on Deezer. Try another song.");
    }

    // set the track details
    this.newTrackDetails.title = responseJson.data[0].title;
    this.newTrackDetails.artist = responseJson.data[0].artist.name;
    this.newTrackDetails.album = responseJson.data[0].album.title;
    this.newTrackDetails.externalUrl = responseJson.data[0].link;

    return this.newTrackDetails;
  }
}

export default DeezerTrackSearch;
