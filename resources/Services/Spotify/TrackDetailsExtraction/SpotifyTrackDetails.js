import QueryTrackDetails from "../../../Interfaces/QueryTrackDetails.js";
import GenerateSpotifyToken from "../Oauth/GenerateSpotifyToken.js";

/*  
  This class is responsible for getting the track details from Spotify API given a track id.

  Attributes:
      trackDetails (object): The track details.
      trackId (string): The track id.
      token (string): The token.

  Returns:
      object: The track details.

  Methods:
      getTrackDetails(trackId): Gets the track details from Spotify API given a track id.

  
  Example:
      const spotifyTrack = new SpotifyTrackDetails();
      spotifyTrack
        .getTrackDetails("7BH6nyhnWTSfMUwwrCYbJF")
        .then((details) => {
          console.log(details);
        })
        .catch((error) => {
          console.error(error);
        });
*/
class SpotifyTrackDetails extends QueryTrackDetails {
  async getTrackDetails(trackId) {
    this.trackId = trackId;

    // Get the token
    const tokenGenerator = new GenerateSpotifyToken();
    this.token = await tokenGenerator.getToken();

    // Set the url
    const url = `${process.env.SPOTIFY_API_TRACK_QUERY_URL}${this.trackId}`;

    // Set the headers
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };

    // Set the timeout
    const TIMEOUT = 5000;

    // Get the response
    const response = await fetch(url, {
      headers: headers,
      timeout: TIMEOUT,
    });

    // Check if the response is valid
    if (response.status !== 200) {
      const message = await response.json();
      throw new Error(message.error.message);
    }

    // Get the track details
    const responseJson = await response.json();
    this.trackDetails.title = responseJson.name;
    this.trackDetails.artist = responseJson.artists[0].name;
    this.trackDetails.album = responseJson.album.name;
    this.trackDetails.externalUrl = responseJson.external_urls.spotify;

    return this.trackDetails;
  }
}

export default SpotifyTrackDetails;
