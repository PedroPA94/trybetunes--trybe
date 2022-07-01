import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import SearchResults from './SearchResults';

const MIN_ARTIST_NAME_LENGTH = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      loading: false,
      searchResults: undefined,
      artistName: '',
    };
  }

  handleInput = ({ target }) => {
    const { value } = target;
    this.setState({
      searchValue: value,
    });
  }

  toggleLoading = () => {
    this.setState((prevState) => ({
      loading: !prevState.loading,
    }));
  }

  searchAlbums = async (searchValue) => {
    this.toggleLoading();
    const searchResults = await searchAlbumsAPI(searchValue);
    this.setState({
      searchResults,
      artistName: searchValue,
      searchValue: '',
    });
    this.toggleLoading();
  }

  render() {
    const { artistName, loading, searchResults, searchValue } = this.state;
    const validArtist = searchValue.length >= MIN_ARTIST_NAME_LENGTH;
    const showSearch = searchResults
      ? <SearchResults artistName={ artistName } searchResults={ searchResults } />
      : null;
    return (
      <div data-testid="page-search">
        <input
          type="text"
          placeholder="Nome do artista"
          value={ searchValue }
          onChange={ this.handleInput }
          data-testid="search-artist-input"
        />
        <button
          type="button"
          onClick={ () => this.searchAlbums(searchValue) }
          disabled={ !validArtist }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
        {
          loading
            ? <Loading />
            : showSearch
        }
      </div>
    );
  }
}

export default Search;
