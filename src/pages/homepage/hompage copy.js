import React, { useState, useEffect } from "react";
import TracksAPI from "../../api/TracksAPI";
import "./homepage.css";
import deezerIcon from "../../assets/icons/icons8-deezer-500.png";
import spotifyIcon from "../../assets/icons/icons8-spotify-500.png";

function Homepage() {
  // const [trackData, setTrackData] = useState(null);
  // const [thumbnail, setThumbnail] = useState("");
  // const [blockedUrl, setBlockedUrl] = useState("");

  // useEffect(() => {
  //   // Get the blocked url from the query string
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const blockedUrl = urlParams.get("blockedurl");

  //   // Set the blocked url
  //   setBlockedUrl(blockedUrl);

  //   // Fetch the track data
  //   const trackAPI = new TracksAPI();
  //   const fetchData = async () => {
  //     try {
  //       const data = await trackAPI.getAllTracks(blockedUrl);
  //       setTrackData(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (!trackData) {
  //     return;
  //   }

  //   const { spotify, deezer } = trackData;

  //   if (blockedUrl.includes("spotify") && spotify) {
  //     const src = `https://open.spotify.com/embed/track/${spotify.track.id}`;
  //     setThumbnail(src);
  //   } else if (blockedUrl.includes("deezer") && deezer) {
  //     const trackId = deezer.track.externalUrl.split("/").pop();
  //     const src = `https://widget.deezer.com/widget/dark/track/${trackId}`;
  //     setThumbnail(src);
  //   }
  // }, [trackData, blockedUrl]);

  return (
    <div className="homepage-container">
      <div className="topbar">
        <div className="thumbnail-container">
          <iframe
            className="thumbnail-frame"
            title="song thumbnail"
            id="thumbnail-src"
            src={thumbnail}
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

const MemoizedHomepage = React.memo(Homepage);
export default MemoizedHomepage;
