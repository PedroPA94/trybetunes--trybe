import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: [],
      songs: [],
      loading: true,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.fetchMusics();
    this.fetchFavoriteSongs();
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const [artist, ...songs] = await getMusics(id);
    this.setState({
      artist,
      songs,
    });
  }

  fetchFavoriteSongs = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteSongs: [...favoriteSongs],
    });
  }

  handleFavoriteSong = async (checked, trackId) => {
    this.setState({ loading: true });
    const { songs } = this.state;
    const song = songs.find((s) => s.trackId === trackId);
    console.log(song);
    if (checked) {
      await addSong(song);
    } else {
      await removeSong(song);
    }
    this.fetchFavoriteSongs();
  }

  render() {
    const { artist, songs, loading, favoriteSongs } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-album">
        <h2 data-testid="artist-name">{ artist.artistName }</h2>
        <h3 data-testid="album-name">{ artist.collectionName }</h3>
        {
          songs.map(({ trackName, previewUrl, trackId }) => (
            <MusicCard
              trackName={ trackName }
              previewUrl={ previewUrl }
              trackId={ trackId }
              key={ trackId }
              checked={ favoriteSongs.some((song) => song.trackId === trackId) }
              onChange={ this.handleFavoriteSong }
            />
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape(({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};

export default Album;
