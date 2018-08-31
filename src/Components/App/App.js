import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchResults: [
        { name: 'Monster', artist: 'Kanye West', album: 'My Beautiful Dark Twisted Fantasy', id: '01' },
        { name: 'Know Yourself', artist: 'Drake', album: 'If You\'re Reading This It\'s Too Late', id: '02' },
        { name: 'The Story of OJ', artist: 'Jay-Z', album: '4:44', id: '03' }
      ],
      playlistName: 'Clover',
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
      let newTracks = [];
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
    let trackURIs = this.state.playlistTracks.map(track => track.uri)
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