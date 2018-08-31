import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify.js';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (!this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      let newTracks = this.state.playlistTracks;
      newTracks.push(track)
    this.setState({playlistTracks: newTracks})
    }
  }

  removeTrack(track) {
    let newTracks = this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
    this.setState({playlistTracks: newTracks})
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState(
        {
          playlistName: 'New Playlist',
          playlistTracks: []
        })
    })
  }

  search(term) {
    Spotify.search(term).then(tracks => {
      this.setState({
        searchResults: tracks
      })
    });
  }

  render() {
    return (
      <div>
        <h1>Bu<span className="highlight">zz</span>ing</h1>
        <div className="App">
          < SearchBar onSearch= {this.search} />
          <div className="App-playlist">
            <SearchResults searchResults= {this.state.searchResults} onAdd= {this.addTrack} />
            <Playlist playlistName= {this.state.playlistName} playlistTracks= {this.state.playlistTracks} onRemove= {this.removeTrack} onNameChange= {this.updatePlaylistName} onSave= {this.savePlaylist} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;