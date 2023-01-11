import type { GatsbyConfig } from 'gatsby';
import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

console.log(
  process.env.GATSBY_SPOTIFY_CLIENT_ID,
  process.env.GATSBY_SPOTIFY_REFRESH_TOKEN,
);

const config: GatsbyConfig = {
  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)
  siteMetadata: {
    title: 'Gatsby weather',
    description: 'A weather app powered by GatsbyJS and GraphQL',
    copyright: '©︎ KENTO HONDA 2022. All Rights Reserved.',
  },
  plugins: [
    `gatsby-plugin-pnpm`,
    'gatsby-plugin-use-query-params',
    {
      resolve: `gatsby-source-openweathermap`,
      options: {
        apikey: process.env.GATSBY_OPEN_WEATHER_API_KEY,
        location: '*',
        units: 'metric',
        type: 'forecast',
      },
    },
    {
      resolve: `gatsby-source-spotify`,
      options: {
        clientId: process.env.GATSBY_SPOTIFY_CLIENT_ID,
        clientSecret: process.env.GATSBY_SPOTIFY_CLIENT_SECRET,
        refreshToken: process.env.GATSBY_SPOTIFY_REFRESH_TOKEN,

        fetchPlaylists: true, // optional. Set to false to disable fetching of your playlists
        fetchRecent: true, // optional. Set to false to disable fetching of your recently played tracks
        timeRanges: ['short_term', 'medium_term', 'long_term'], // optional. Set time ranges to be fetched
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
    },
  ],
  jsxRuntime: `automatic`,
};

export default config;
