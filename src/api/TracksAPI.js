/**
 * Class representing the TracksAPI.
 * @class
 */
class TracksAPI {
  constructor() {
    this.getAllTracks = this.getAllTracks.bind(this);
  }

  /**
   * Fetches all tracks from the given URL.
   * @async
   * @param {string} url - The URL to fetch tracks from.
   * @returns {Promise} A Promise that resolves with the fetched data.
   */
  async getAllTracks(url) {
    const args = `${process.env.REACT_APP_SOUNDLINK_ALL_TRACKS_API}url=${url}`;
    const response = await fetch(args);
    const data = await response.json();
    return data;
  }
}

export default TracksAPI;
