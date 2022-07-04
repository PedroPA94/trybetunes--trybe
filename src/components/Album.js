import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: [],
      songs: [],
      loading: true,
      favoriteSongs: undefined,
    };
  }

  async componentDidMount() {
    await this.fetchMusics();
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteSongs,
    });
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const [artist, ...songs] = await getMusics(id);
    this.setState({
      artist,
      songs,
    });
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
              checked={
                favoriteSongs
                  ? favoriteSongs.some((song) => song.trackId === trackId)
                  : false
              }
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
