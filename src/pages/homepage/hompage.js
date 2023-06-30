import React, { useState, useEffect } from "react";
import TracksAPI from "../../api/TracksAPI";
import "./homepage.css";
import deezerIcon from "../../assets/icons/icons8-deezer-500.png";
import spotifyIcon from "../../assets/icons/icons8-spotify-500.png";

function Homepage() {
  const [trackData, setTrackData] = useState(null);
  useEffect(() => {
    const trackAPI = new TracksAPI();
    const urlParams = new URLSearchParams(window.location.search);
    const blockedUrl = urlParams.get("blockedUrl");
    const fetchData = async () => {
      const data = await trackAPI.getAllTracks(blockedUrl);
      setTrackData(data);
    };
    fetchData();
  }, []);
  return (
    <div className="homepage-container">
      <div className="topbar">
        <div className="thumbnail-container">
          <iframe
            className="thumbnail-frame"
            title="song thumbnail"
            id="thumbnail-src"
            src={
              "https://open.spotify.com/embed/track/" +
              trackData?.spotify.track.id
            }
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowtransparency="true"
            loading="lazy"
          />
        </div>
        <div className="open-with">
          <h3>Open with</h3>
        </div>
        <div className="button-container">
          <div className="button-group">
            <a
              id="deezer-button"
              className="button"
              data-service="deezer"
              href={trackData?.deezer.track.externalUrl}
            >
              <img src={deezerIcon} alt="Deezer" />
            </a>

            <a
              id="spotify-button"
              className="button"
              href={trackData?.spotify.track.externalUrl}
              data-service="spotify"
            >
              <img src={spotifyIcon} alt="Spotify" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
