/**
 * Class representing the TracksAPI.
 * @class
 */
class TracksAPI {
  /**
   * Fetches all tracks from the given URL.
   * @async
   * @param {string} url - The URL to fetch tracks from.
   * @returns {Promise} A Promise that resolves with the fetched data.
   */
  async getAllTracks(url) {
    const args = process.env.SOUNDLINK_ALL_TRACKS_API + url;
    const response = await fetch(args);
    const data = await response.json();
    return data;
  }
}

export default TracksAPI;
