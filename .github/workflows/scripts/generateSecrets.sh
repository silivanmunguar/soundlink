!/bin/bash

# Add secrets to repository settings
{
  echo "DEEZER_API_TRACK_QUERY_URL=$DEEZER_API_TRACK_QUERY_URL"
  echo "SPOTIFY_API_TOKEN_GENERATOR_URL=$SPOTIFY_API_TOKEN_GENERATOR_URL"
  echo "SPOTIFY_CLIENT_ID=$SPOTIFY_CLIENT_ID"
  echo "SPOTIFY_API_TRACK_QUERY_URL=$SPOTIFY_API_TRACK_QUERY_URL"
  echo "SPOTIFY_CLIENT_SECRET=$SPOTIFY_CLIENT_SECRET"
} >> $GITHUB_ENV
