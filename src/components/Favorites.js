import React from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  fetchFavoriteSongs = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs: [...favoriteSongs],
      loading: false,
    });
  }

  handleFavoriteSong = async (_checked, trackId) => {
    this.setState({ loading: true });
    const { favoriteSongs } = this.state;
    const song = favoriteSongs.find((s) => s.trackId === trackId);
    await removeSong(song);
    this.fetchFavoriteSongs();
  }

  render() {
    const { favoriteSongs, loading } = this.state;
    if (loading) return <Loading />;
    const songsList = favoriteSongs.map(({ trackName, previewUrl, trackId }) => (
      <MusicCard
        trackName={ trackName }
        previewUrl={ previewUrl }
        trackId={ parseInt(trackId, 10) }
        key={ trackId }
        checked
        onChange={ this.handleFavoriteSong }
      />
    ));
    return (
      <div data-testid="page-favorites">
        <ul>
          { songsList }
        </ul>
      </div>
    );
  }
}

export default Favorites;
