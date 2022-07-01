import React from 'react';
import PropTypes from 'prop-types';
import AlbumCard from './AlbumCard';

class SearchResults extends React.Component {
  render() {
    const { artistName, searchResults } = this.props;
    if (searchResults.length === 0) return <h3>Nenhum álbum foi encontrado</h3>;
    return (
      <div>
        <h3>
          Resultado de álbuns de:
          { ' ' }
          { artistName }
        </h3>
        {
          searchResults.map((album) => (
            <AlbumCard key={ album.collectionId } album={ album } />))
        }
      </div>
    );
  }
}

SearchResults.propTypes = {
  artistName: PropTypes.string.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SearchResults;
