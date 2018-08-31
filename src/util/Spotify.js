import SearchBar from "../Components/SearchBar/SearchBar";

const spotifyAuthorizeURIBase = 'https://accounts.spotify.com/authorize'
const spotifyAPIURIBase = 'https://api.spotify.com/v1/'
const clientId = '73fc0c7621b948f08915e08fa51dcb37'
const redirectURI = 'http://localhost:3000/'

const token

const Spotify = {
  
  getAccessToken() {
    if(token) {
      return token
    }

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

      if (tokenMatch && expiresInMatch) {
        token = tokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
        window.setTimeout(() => token = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return token;
      } else {
          const spotifyAuthorizeURI = `${spotifyAuthorizeURIBase}?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
          window.location = spotifyAuthorizeURI;
        }
  },

  search(term) {
    const searchRequest = `${spotifyAPIURIBase}search?type=track&q=${term}`
    return fetch(searchRequest, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.track.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  }

};



export default Spotify;