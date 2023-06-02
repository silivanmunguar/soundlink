import QueryTrackDetails from "./QueryTrackDetails.js";
import TrackParamsExtractor from "./TrackParamsExtractor.js";
import TrackSearch from "./TrackSearch.js";

describe("QueryTrackDetails", () => {
  describe("getTrackDetails", () => {
    it("should return the details of the queried track", async () => {
      // Arrange
      const queryTrackDetails = new QueryTrackDetails();
      queryTrackDetails.trackId = "3Zwu2K0Qa5sT6teZO0Ql3j";
      queryTrackDetails.token = "my-auth-token";

      // Act
      const trackDetails = await queryTrackDetails.getTrackDetails();

      // Assert
      expect(trackDetails).toEqual({
        id: "3Zwu2K0Qa5sT6teZO0Ql3j",
        name: "Example Track",
        artist: "Example Artist",
        album: "Example Album",
      });
    });
  });
});

describe("TrackParamsExtractor", () => {
  describe("extractTrackParams", () => {
    it("should extract the track parameters from the shared URL", () => {
      // Arrange
      const trackParamsExtractor = new TrackParamsExtractor();
      trackParamsExtractor.sharedUrl =
        "https://open.spotify.com/track/3Zwu2K0Qa5sT6teZO0Ql3j?si=8e2e2e2e2e2e2e2e";

      // Act
      const trackParams = trackParamsExtractor.extractTrackParams();

      // Assert
      expect(trackParams).toEqual({
        serviceProvider: "spotify",
        trackId: "3Zwu2K0Qa5sT6teZO0Ql3j",
      });
    });
  });
});

describe("TrackSearch", () => {
  describe("searchForTrack", () => {
    it("should search for details of a new track", async () => {
      // Arrange
      const trackSearch = new TrackSearch();
      trackSearch.incomingTrackDetails = {
        serviceProvider: "spotify",
        trackId: "3Zwu2K0Qa5sT6teZO0Ql3j",
      };

      // Act
      const newTrackDetails = await trackSearch.searchForTrack(
        trackSearch.incomingTrackDetails
      );

      // Assert
      expect(newTrackDetails).toEqual({
        id: "4XgOZv9XV9FZxZxMOO2bqv",
        name: "New Track",
        artist: "New Artist",
        album: "New Album",
      });
    });
  });
});
