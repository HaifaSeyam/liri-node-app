console.log('this is loaded');

module.exports = {
  spotify:{
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  },
  mapquest: {
    id: process.env.MAPQUEST_ID,
    secret: process.env.MAPQUEST_SECRET
  }
};