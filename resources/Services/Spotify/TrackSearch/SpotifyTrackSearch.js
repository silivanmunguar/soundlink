import TrackSearch from "../../../Interfaces/TrackSearch.js";
import GenerateSpotifyToken from "../Oauth/GenerateSpotifyToken.js";

class SpotifyTrackSearch extends TrackSearch {
  async searchForTrack(incomingTrackDetails) {
    // Set the incoming track details
    this.incomingTrackDetails = incomingTrackDetails;

    //Set suffix params
    const surfixParams = "&type=track&limit=1";

    // Set the search url
    this.searchUrl = `${process.env.SPOTIFY_SEARCH_URL}+${this.incomingTrackDetails.artist}+${this.incomingTrackDetails.title}${surfixParams}`;

    console.log("Search URL: ", this.searchUrl);

    // Get the token
    const tokenGenerator = new GenerateSpotifyToken();
    this.token = await tokenGenerator.getToken();

    // Set the headers
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };

    // Set the timeout
    const TIMEOUT = 5000;

    // Get the response
    const response = await fetch(this.searchUrl, {
      headers: headers,
      timeout: TIMEOUT,
    });

    // Check if the response is valid
    if (response.status !== 200) {
      const message = await response.json();
      throw new Error(message.error.message);
    }

    // Get the track details
    const responseJSON = await response.json();

    // Get the track details
    this.newTrackDetails.title = responseJSON.tracks.items[0].name;
    this.newTrackDetails.artist = responseJSON.tracks.items[0].artists[0].name;
    this.newTrackDetails.album = responseJSON.tracks.items[0].album.name;
    this.newTrackDetails.externalUrl =
      responseJSON.tracks.items[0].external_urls.spotify;

    return this.newTrackDetails;
  }
}

export default SpotifyTrackSearch;
