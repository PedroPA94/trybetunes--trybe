import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      loading: false,
    };
  }

  handleFavoriteSong = async (checked, trackId) => {
    this.setState({
      loading: true,
      checked,
    });
    const song = await getMusics(trackId);
    if (checked) {
      await addSong(...song);
    } else {
      await removeSong(...song);
    }
    this.setState({
      loading: false,
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { checked, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <input
          type="checkbox"
          data-testid={ `checkbox-music-${trackId}` }
          onChange={ ({ target }) => this.handleFavoriteSong(target.checked, trackId) }
          checked={ checked }
        />
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
