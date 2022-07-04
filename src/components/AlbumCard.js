import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class AlbumCard extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  render() {
    const {
      album:
      {
        artistName,
        artworkUrl100,
        collectionName,
        collectionId,
      },
    } = this.props;
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={ `/album/${collectionId}` } />;
    }
    return (
      <button
        type="button"
        className="AlbumCard"
        data-testid={ `link-to-album-${collectionId}` }
        onClick={ () => this.setState({ redirect: true }) }
      >
        <img src={ artworkUrl100 } alt={ collectionName } />
        <h4>{ collectionName }</h4>
        <p>{ artistName }</p>
      </button>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
  }).isRequired,
};

export default AlbumCard;
