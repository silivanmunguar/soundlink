import SpotifyTrackSearch from '../services/Spotify/TrackSearch/SpotifyTrackSearch.js'
import SpotifyTrackDetails from '../services/Spotify/TrackDetailsExtraction/SpotifyTrackDetails.js'
import DeezerTrackSearch from '../services/Deezer/TrackSearch/DeezerTrackSearch.js'
import DeezerTrackDetails from '../services/Deezer/TrackDetailsExtraction/DeezerTrackDetailsExtraction.js'

class SearchAllServices {
  constructor() {
    this.trackDetails = {}
    this.resultsFromAllServices = {
      spotify: {},
      deezer: {},
    }
    this.spotify = true
    this.deezer = true
    this.trackParams = {}
  }

  async getAllTracks(trackParams) {
    // Set track params
    this.trackParams = trackParams

    // Get track details on spotify
    if (this.trackParams.serviceProvider === 'spotify') {
      const spotifyTrackDetails = new SpotifyTrackDetails()
      // Search get track details on spotify
      try {
        this.trackDetails = await spotifyTrackDetails.getTrackDetails(
          this.trackParams.trackId,
        )
      } catch (error) {
        console.log('Error getting spotify tracj details: ', error)
      }

      // Set the track details
      this.resultsFromAllServices.spotify.track = this.trackDetails

      // Set spotify to false so that we don't search for track details on spotify again
      this.spotify = false

      // Search for track details on other services
      await this.searchForTracks(this.trackDetails)

      // Return the results from all services
      return this.resultsFromAllServices
    }

    // // Get track details on deezer
    if (this.trackParams.serviceProvider === 'deezer') {
      const deezerTrackDetails = new DeezerTrackDetails()
      try {
        this.trackDetails = await deezerTrackDetails.getTrackDetails(
          this.trackParams.trackId,
        )
      } catch (error) {
        console.log('Error getting deezer track details: ', error)
      }

      // Set the track details
      this.resultsFromAllServices.deezer.track = this.trackDetails

      // Set deezer to false so that we don't search for track details on deezer again
      this.deezer = false

      // Search for track details on other services
      await this.searchForTracks(this.trackDetails)

      // Return the results from all services
      return this.resultsFromAllServices
    }
  }

  async searchForTracks(trackDetails) {
    // Search for track details on other services
    if (this.spotify) {
      const spotifyTrackSearch = new SpotifyTrackSearch()
      try {
        this.trackDetails = await spotifyTrackSearch.searchForTrack(
          this.trackDetails,
        )
      } catch (error) {
        this.trackDetails = {}
        console.log('Error: ', error)
      }
      // Set the track details
      this.resultsFromAllServices.spotify.track = this.trackDetails
    }

    if (this.deezer) {
      try {
        this.trackDetails = await new DeezerTrackSearch().searchForTrack(
          this.trackDetails,
        )
      } catch (error) {
        this.trackDetails = {}
        console.log('Error: ', error)
      }

      console.log('we are here')
      // Set the track details
      this.resultsFromAllServices.deezer.track = this.trackDetails
    }
  }
}

export default SearchAllServices
